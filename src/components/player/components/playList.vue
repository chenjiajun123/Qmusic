<template>
  <transition name="list-fade">
    <div class="playlist-box" v-show="showFlag" @click="hide">
      <div class="playlist">
        <div class="list-header">
          <div class="left">
            <i v-if="modeText==='顺序播放'" class="icon-sequence font24"></i>
            <i v-if="modeText==='单曲循环'" class="icon-loop font24"></i>
            <i v-if="modeText==='随机播放'" class="icon-random font24"></i>
            <span class="font14">{{modeText}}</span>
          </div>
          <span class="right">
            <i class="icon-clear font18" @click.stop="clear"></i>
          </span>
        </div>
        <Scroll class="list-content" ref="listContent">
          <transition-group ref="list" name="list-li" tag="ul">
            <li ref="listItem" v-for="(item,index,key) in sequenceList" :index="index" :key="index" @click="selectItem(item, index)">
              <div class="left">
                <span class="icon"><i v-if="getCurrentIcon(item)" class="icon-play font12"></i></span>
                <span class="font12 name">{{item.name}}</span>
              </div>
              <div class="right">
                <span @click.stop="toggleFavoriteList(item)" class="favorite-icon">
                  <i v-if="getFavoriteListCollect(item)" class="icon icon-not-favorite font12"></i>
                  <i v-else class="icon icon-favorite font12"></i>
                </span>
                <span class="close-icon"><i class="icon-close font12" @click.stop="clearOne(item)"></i></span>
              </div>
            </li>
          </transition-group>
        </Scroll>
        <div class="add-song">
          <div class="text" @click.stop="addSong">
            <i class="icon-add font12"></i>
            <span class="font12">添加歌曲到队列</span>
          </div>
        </div>
        <div class="list-close" @click="hide">
          <span class="font16">关闭</span>
        </div>
      </div>
      <confirm text="是否清空列表" ref="confirm" @confirm="confirmClear"></confirm>
      <topTip ref="topTip">
        <div class="tip-title">
          <span class="text font14">已从播放列表删除</span>
        </div>
      </topTip>
      <addSong ref="add"></addSong>
    </div>
  </transition>
</template>
<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from "vuex"
  import {
    playMode
  } from '../../../assets/JS/common/playMode'
  import Scroll from "../../base/scroll/scroll"
  import confirm from "../../base/confirm/confirm"
  import topTip from "../../base/topTip/topTip"
  import addSong from "./addSong"
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      Scroll,
      confirm,
      topTip,
      addSong
    },
    data() {
      return {
        showFlag: false
      };
    },
    computed: {
      //播放模式文本
      modeText() {
        return this.mode === playMode.sequence ?
          "顺序播放" :
          this.mode === playMode.random ? "随机播放" : "单曲循环";
      },
      ...mapGetters(["sequenceList", "currentSong", "playlist", "mode", "favoriteList"])
    },
    watch: {
      //当前歌曲监听
      currentSong(newSong, oldSong) {
        if (!this.showFlag || newSong.id === oldSong.id) {
          return;
        }
        setTimeout(() => {
          this.scrollToCurrent(newSong);
        }, 20);
      }
    },
    methods: {
      //清除一首歌曲
      clearOne(song) {
        this.deleteSong(song);
        this.$refs.topTip.show()
        if (!this.playlist.length) {
          this.hide();
        }
      },
      //页面显示切换到当前播放歌曲
      scrollToCurrent(current) {
        const index = this.sequenceList.findIndex(song => {
          return current.id === song.id;
        });
        this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300);
      },
      //确定全部清除
      confirmClear() {
        this.deleteSongList()
      },
      //清除歌曲弹窗
      clear() {
        this.$refs.confirm.show()
      },
      //添加歌曲页面显示
      addSong() {
        this.$refs.add.show()
      },
      // 添加收藏
      getFavoriteListCollect(song) {
        if (this.isFavoriteList(song)) {
          return false;
        } else {
          return true;
        }
      },
      // 点击收藏
      toggleFavoriteList(song) {
        if (this.isFavoriteList(song)) {
          this.deleteFavoriteList(song);
          // this.$refs.topTip.show();
        } else {
          this.saveFavoriteList(song);
        }
      },
      // 判断当前播放歌曲是否收藏
      isFavoriteList(song) {
        const index = this.favoriteList.findIndex(item => {
          return item.id === song.id;
        });
        return index > -1;
      },
      //获取当前播放歌曲按钮
      getCurrentIcon(item) {
        if (this.currentSong.id === item.id) {
          return true;
        }
        return false;
      },
      //选择歌曲
      selectItem(item, index) {
        this.showFlag = false;
        if (this.mode === playMode.random) {
          index = this.playlist.findIndex(song => {
            return song.id === item.id;
          });
        }
        this.setCurrentIndex(index);
        this.setPlayingState(true);
      },
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false;
      },
      ...mapMutations({
        setCurrentIndex: "SET_CURRENT_INDEX",
        setPlayingState: "SET_PLAYING_STATE"
      }),
      ...mapActions([
        "deleteSong",
        "deleteSongList",
        "saveFavoriteList",
        "deleteFavoriteList"
      ])
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
