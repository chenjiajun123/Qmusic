<template>
  <scroll class="singer-list" ref="singerList" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
    <div ref="singerlist">
      <div class="list-group" v-for="(item,index,key) in Singers" :index="index" :key="index" ref="listGroup">
        <p class="group-title font12">{{item.title}}</p>
        <div class="group-content">
          <ul class="group-list">
            <li class="group-item" v-for="(list,index,key) in item.items" :index="index" :key="index" @click="SelectItem(list)">
              <img v-lazy="list.avatar">
              <span class="font14 text">{{list.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ul class="aside">
      <li v-for="(item,index,key) in aside" :index="index" :key="key" :class="[currentIndex===index?'current':'aside-item']"
        @touchstart.stop.prevent="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
        {{item}}
      </li>
    </ul>
    <div class="loading-container" v-show="!Singers.length">
      <v-loading></v-loading>
    </div>
    <div class="fixed-title" v-show="fixedTitle" ref="fixed">{{fixedTitle}}</div>
  </scroll>
</template>
<script>
  import scroll from '../../base/scroll/scroll'
  import loading from '../../base/loading/loading'
  import {
    playlistMixin
  } from '../../../assets/JS/common/mixin'
  export default {
    mixins: [playlistMixin],
    props: {
      Singers: {
        type: Array
      } 
      //传过来的歌手数据
    },
    //import引入的组件需要注入到对象中才能使用
    components: {
      scroll,
      "v-loading": loading
    },
    data() {
      return {
        currentIndex: 0,
        scrollY: -1,
        diff: -1,
      };
    },
    computed: {
      aside() {
        return this.Singers.map((item, index, key) => {
          return item.title.substr(0, 1)
        })
      },
      //侧边栏字母
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.Singers[this.currentIndex] ? this.Singers[this.currentIndex].title : '  '
      }
      //标题固定
    },
    watch: {
      //列表歌手的改变
      Singers() {
        setTimeout(() => {
          this.callHeight()
        }, 20);
      },
      // 滚动位置改变
      scrollY(newY) {
        const listHeight = this.listHeight
        if (newY > 0) {
          this.currentIndex = 0
          return ''
        }
        for (let i = 0; i < listHeight.length - 1; i++) {

          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i

            // 距离多久才达到替换固定标题的条件

            this.diff = height2 + newY

            return
          }
        }
      },
      //固定标题改变
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < 60) ? newVal - 60 : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3D(0, ${fixedTop}px, 0)`
      }
    },
    methods: {
      //判断是否有歌曲在播放
      handlePlaylist(playlist) {
        if (this.$refs.singerlist) {
          const bottom = playlist.length > 0 ? '1.8rem' : 0
          this.$refs.singerlist.style.paddingBottom = bottom
          this.$refs.singerList.refresh();
        }
      },
      //侧边栏字母点击跳转
      onShortcutTouchStart(e) {

        let anchorIndex
        if (e.target.hasAttribute('index')) {
          anchorIndex = e.target.getAttribute('index')
        }
        let firstTouch = e.touches[0]

        this.touch.y1 = firstTouch.pageY

        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      //侧边栏字母点击跳转
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / 32 | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta
        this._scrollTo(anchorIndex)
      },
      //侧边栏字母点击跳转
      _scrollTo(index) {

        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.scrollY = -this.listHeight[index]

        this.$refs.singerList.scrollToElement(this.$refs.listGroup[index], 0)
      },
      // 选择歌曲
      SelectItem(list) {
        this.$emit("select", list)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      //列表排序
      callHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 1
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          height += list[i].clientHeight
          this.listHeight.push(height)
        }
      }
    },
    created() {
      this.listenScroll = true
      this.probeType = 3
      this.touch = {}
    },
    mounted() {

    },
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {},
  }

</script>
<style>


</style>
