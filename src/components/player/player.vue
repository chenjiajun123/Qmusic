<template>
  <div id="player" v-show="playlist.length>0">
    <div class="normal-player" v-show="fullScreen">
      <div class="bg-player">
        <img :src="currentSong.image">
      </div>
      <div class="top">
        <div class="top-title">
          <i class="icon-back font18" @click="toDown"></i>
          <h1 class="font16">{{currentSong.name}}</h1>
          <p class="title-singer font16">{{currentSong.singer}}</p>
        </div>
      </div>
      <div class="middle">
        <img :src="currentSong.image" :class="playing ? 'platStart':'playEnd'">
        <p :class="playImgTxt" class="cd-lyric font14">
          {{playingLyric}}
        </p>
      </div>
      <div class="bottom">
        <div class="bottom-time-box">
          <span class="time-l font14">{{format(currentTime)}}</span>
          <progressBar style="overflow:hidden" :percent="percent" @percentChange="percentChange"></progressBar>
          <span class="time-r font14">{{format(currentSong.duration)}}</span>
        </div>
        <audio ref="audio" @canplay="audioReady" @error="audioError" @timeupdate="timeUpdate" @ended="songEnd"></audio>
        <div class="bottom-button-box">
          <span class="mode" @click="changeMode">
            <i v-if="mode===0" class="icon-sequence font30"></i>
            <i v-if="mode===1" class="icon-loop font30"></i>
            <i v-if="mode===2" class="icon-random font30"></i>
          </span>
          <span clas="prev" @click="prev">
            <i class="font30 icon-prev"></i>
          </span>
          <span class="playing" @click="togglePlaying">
            <i v-if="playing" class="icon-pause font30"></i>
            <i v-if="!playing" class="icon-play font30"></i>
          </span>
          <span clas="next" @click="next">
            <i class="font30 icon-next"></i>
          </span>
          <span clas="favorite" @click="toggleFavoriteList(currentSong)">
            <i v-if="getFavoriteListCollect(currentSong)" class="icon icon-not-favorite font30"></i>
            <i v-else class="icon icon-favorite font30"></i>
          </span>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="toUp">
      <div class="left">
        <img :src="currentSong.image" :class="playing ? 'ministart' :'miniend'">
        <div class="text">
          <h2 class="font12">{{currentSong.name}}</h2>
          <p class="font12">{{currentSong.singer}}</p>
        </div>
      </div>
      <div class="control">
        <span class="icon-one" @click.stop="togglePlaying">
          <i v-if="playing" class="font30  icon-pause-mini"></i>
          <i v-else class="icon-play font30"></i>
        </span>
        <span>
          <i class="icon-playlist font30 icon-two" @click.stop="playClick"></i>
        </span>
      </div>
    </div>
    <playList ref="playlist"></playList>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from "vuex"
  import {
    getVkey,
    getLyric
  } from "../../assets/JS/api/song"
  import {
    songUrl
  } from "../../assets/JS/common/song"
  import progressBar from './components/progressBar.vue'
  import playList from './components/playList.vue'
  import {
    playMode
  } from '../../assets/JS/common/playMode'
  import {
    shuffle
  } from "../../assets/JS/common/util";
  import {
    Base64
  } from "js-base64";
  import Lyric from "lyric-parser";
  import scroll from "../base/scroll/scroll";
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      progressBar,
      playList
    },
    data() {
      return {
        songReadey: false,
        currentTime: '',
        songUrlData: '',
        currentLyric: null, // 封装后的歌词对象
        currentShow: "cd", // 轮播图底部导航
        currentLineNum: 2, // 当前下显示歌词行数
        playingLyric: "" // 当前cd页显示歌词
      };
    },
    computed: {
      ...mapGetters([
        "fullScreen",
        "playlist",
        "currentSong",
        "vkey",
        "playing",
        "currentIndex",
        "mode",
        "sequenceList",
        "favoriteList"
      ]),
      //歌曲播放百分比
      percent() {
        return this.currentTime / this.currentSong.duration
      },
      //歌曲播放页面或歌词页面
      playImgTxt() {
        let class2 = this.currentShow === "lyric" ? "playImg" : "";
        return `${class2}`;
      }
    },
    watch: {
      //播放状态的监听
      playing(val) {
        this.$nextTick(() => {
          const audio = this.$refs.audio;
          val ? audio.play() : audio.pause();
        })
      },
      vkey(val, oldVal) {
        this.songUrlData = songUrl(val, this.currentSong.mid)
        this.songPlay()
      },
      //当前播放歌曲
      currentSong(newSong, oldSong) {
        if (!newSong.id) {
          return
        }
        if (newSong === oldSong) {
          return
        }
        if (this.currentLyric) {
          this.currentLyric.stop();
        }
        this.$nextTick(() => {
          this._getVkey(this.currentSong.mid);
        })
      }
    },
    methods: {
      //播放列表的显示
      playClick() {
        this.$refs.playlist.show()
      },
      //播放页面是否全屏
      toUp() {
        this.setFullScreen(true);
      },
      // 切换播放状态
      togglePlaying() {
        if (this.currentLyric) {
          this.currentLyric.togglePlay();
        }
        // 停止/播放当前歌词播放
        this.setPlayingState(!this.playing);
      },
      // 判断歌曲是否被收藏状态来切换icon
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
      // 改变播放模式
      changeMode() {
        const mode = (this.mode + 1) % 3; // 取余
        this.setPlayMode(mode);
        let list = null;
        if (mode === playMode.random) {
          list = shuffle(this.sequenceList);
        } else {
          list = this.sequenceList;
        }
        this.resetCurrentIndex(list);
        this.setPlayList(list);
      },
      // 重新设置播放歌曲
      resetCurrentIndex(list) {
        let index = list.findIndex(item => {
          return item.id === this.currentSong.id;
        });
        this.setCurrentIndex(index);
      },
      //播放页不全屏
      toDown() {
        this.setFullScreen(false);

      },
      //歌曲播放时间封装
      format(interval) {

        interval = interval | 0
        let min = interval / 60 | 0
        let sec = interval % 60 | 0
        if (sec.toString().length === 1) {
          sec = `0${sec}`
        }
        return `${min}:${sec}`
      },
      //歌曲播放
      songPlay() {

        this.$refs.audio.src = this.songUrlData
        this.$refs.audio.crossOrigin = this.anonymous;
        this.$refs.audio.play();
      },
      //歌曲已加载完成
      audioReady() {
        this.songReadey = true
        this.savePlayHistory(this.currentSong);
      },
       //歌曲加载失败
      audioError() {
        console.log("当前歌曲加载失败，请尝试其他歌曲");
        this.songReadey = true; // 歌曲加载失败是不会阻塞其他歌曲播放
        this.next()
      },
      //歌曲时间实时更新
      timeUpdate(e) {
        this.currentTime = e.target.currentTime;

      },
      //歌曲播放完毕
      songEnd() {

        if (this.mode === playMode.loop) {

          this.songLoop();
        } else {
          this.next();
        }
      },
      //获取歌曲内容
      _getVkey(mid) {
        let that = this;
        getVkey(mid).then(res => {

          if (res.code === 0) {
            let vkey = res.data.items[0].vkey;
            that.setVkey(vkey); // 请求到的key添加到vuex
          } else {
            console.log("player组件 vkey请求错误");
          }
        })
        // 获取歌词
        getLyric(mid).then(res => {
          this.currentLyric = null;
          if (res.code === 0) {
            let lyric = Base64.decode(res.lyric);
            this.currentLyric = new Lyric(lyric, this.handleLyric);
            if (this.playing) {
              // 如果此时正在播放则歌词也开始播放
              this.currentLyric.play();
            }
          } else {
            console.log("player组件 Lyric请求错误");
            this.currentLyric = null;
            this.playingLyric = "";
            this.currentLineNum = 0;
          }
        });
      },
      //歌词排列
      handleLyric({
        lineNum,
        txt
      }) {
        this.currentLineNum = lineNum;
        this.playingLyric = txt;
      },
      percentChange(percent) {
        const currentTime = this.currentSong.duration * percent
        this.$refs.audio.currentTime = currentTime
        if (this.currentLyric) {
          this.currentLyric.seek(currentTime * 1000);
        }
      },
      //上一首歌曲
      prev() {
        if (!this.songReadey) {
          return
        }
        if (this.playlist === 1) {
          this.songLoop()
        } else {
          let index = this.currentIndex - 1
          if (index === -1) {
            index = this.playlist.length - 1
          }
          this.setCurrentIndex(index)
          this.setPlayingState("true")
        }
        this.songReadey = false
      },
      //歌曲循环播放
      songLoop() {
        if (this.currentLyric) {
          this.currentLyric.seek(0);
        }
        this.$refs.audio.currentTime = 0
        this.$refs.audio.play()
      },
      //下一首歌曲
      next() {
        if (!this.songReadey) {
          return
        }
        if (this.playlist === 1) {
          this.songLoop()
        } else {
          let index = this.currentIndex + 1
          if (index === this.playlist.length) {
            index = 0
          }
          this.setCurrentIndex(index)
          this.setPlayingState("true")
        }
        this.songReadey = false
      },

      ...mapMutations({
        setFullScreen: "SET_FULL_SCREEN", // 设置播放页显示
        setPlayingState: "SET_PLAYING_STATE", // 设置播放状态
        setCurrentIndex: "SET_CURRENT_INDEX", // 设置索引，引起当前播放歌曲变化
        setVkey: "SET_VKEY",
        setPlayMode: "SET_PLAY_MODE",
        setPlayList: "SET_PLAYLIST"
      }),
      ...mapActions(["savePlayHistory", "saveFavoriteList", "deleteFavoriteList"])
    },
    created() {

    },
    mounted() {},
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
