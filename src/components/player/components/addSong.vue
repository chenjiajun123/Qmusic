<template>
  <transition name="slide">
    <div class="addSong" v-show="showFlag" @click.stop>
      <div class="addSong-title">
        <h1 class="font16">添加到歌曲列表</h1>
        <i class="font16 icon-close" @click="hide"></i>
      </div>
      <div class="addSong-list">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
        <div class="list-warraper">
          <scroll ref="songList" v-if="currentIndex===0" class="list-scroll" :data="playHistory">
            <div class="list-one">
              <songList :songs="playHistory" :rank="false" @select="selectSong"></songList>
            </div>
          </scroll>
        </div>
      </div>
      <topTip ref="topTip">
        <div class="tip-title">
          <span class="text">1首歌曲已经添加到播放列表</span>
        </div>
      </topTip>
    </div>
  </transition>
</template>
<script>
  import switches from '../../base/switches/switches'
  import {
    mapGetters,
    mapActions
  } from "vuex"
  import Scroll from "../../base/scroll/scroll"
  import songList from '../../base/songList/songList'
  import topTip from '../../base/topTip/topTip'
  import Song from '../../../assets/JS/common/song'
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      switches,
      Scroll,
      songList,
      topTip
    },
    data() {
      return {
        showFlag: false,  //是否显示
        currentIndex: 0, //当前播放歌曲序号
        //选项卡切换
        switches: [{
            name: "最近播放"
          },
          {
            name: "搜索历史"
          }
        ]
      };
    },
    computed: {
      ...mapGetters(["playHistory"])
    },
    watch: {},
    methods: {
     //列表的显示和隐藏
      show() {
        this.showFlag = true
        setTimeout(() => {
          if (this.currentIndex === 0) {
            // 因为v-show，异步更新dom
            this.$refs.songList.refresh();
          } else {
            this.$refs.searchList.refresh();
          }
        }, 20);
      },
      hide() {
        this.showFlag = false
      },
      //选择选项卡
      switchItem(index) {
        this.currentIndex = index
      },
      //选择歌曲
      selectSong(song, index) {
        if (index !== 0) {
          // 第一条就是正在播放的肯定不需要插入当前播放列表
          this.insertSong(new Song(song)); // 把song对象存到vuex
          this.$refs.topTip.show();

        }
      },
      ...mapActions(["insertSong", "saveSearchHistory", "clearSearchHistory"])
    },
    created() {

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
