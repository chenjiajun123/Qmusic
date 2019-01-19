<template>
  <div id="user">
    <div class="user-header">
      <i class="icon-back font18" @click="back"></i>
      <div class="user-tab">
        <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
      </div>
      <span></span>
    </div>
    <div class="play-btn font12" @click="allPlay">
      播放列表全部
    </div>
    <div class="list-warraper">
      <scroll ref="favoriteList" v-if="currentIndex===0" class="list-scroll" :data="favoriteList">
        <div class="list-one" ref="songList" v-if="favoriteList.length!==0">
          <songList :songs="favoriteList" :rank="false" @select="selectSong"></songList>
        </div>
        <div v-else class="no-result font18">
          <p>暂无内容</p>
        </div>
      </scroll>
      <scroll ref="playHistory" v-if="currentIndex===1" class="list-scroll" :data="playHistory">
        <div class="list-two" ref="songList" v-if="playHistory.length!==0">
          <songList :songs="playHistory" :rank="false" @select="selectSong"></songList>
        </div>
        <div v-else class="no-result font18">
          <p>暂无内容</p>
        </div>
      </scroll>
    </div>
  </div>
</template>
<script>
  import switches from '../base/switches/switches'
  import songList from '../base/songList/songList'
  import Song from '../../assets/JS/common/song'
  import {
    mapGetters,
    mapActions,
    mapMutations
  } from "vuex"
  import scroll from "../base/scroll/scroll"
  import {
    playlistMixin
  } from '../../assets/JS/common/mixin'
  export default {
    mixins: [playlistMixin],
    //import引入的组件需要注入到对象中才能使用
    components: {
      switches,
      songList,
      scroll,
    },
    data() {
      return {
        currentIndex: 0, //当前播放歌曲序号
        switches: [{
            name: "我喜欢的"
          },
          {
            name: "最近听的"
          }
        ] //选项卡切换
      };
    },
    computed: {
      ...mapGetters(["favoriteList", "playHistory"])  //获取收藏记录 播放历史记录
    },
    watch: {},
    methods: {
      back() {
        this.$router.back();
      }, 
      //回退到上一个页面
      handlePlaylist(playlist) {
        if (this.$refs.songList) {
          const bottom = playlist.length > 0 ? '1.8rem' : 0
          this.$refs.songList.style.paddingBottom = bottom
        }
      },//判断是否有歌曲在播放
      show() {
        this.showFlag = true
        setTimeout(() => {
          if (this.currentIndex === 0) {
            // 因为v-show，异步更新dom
            this.$refs.favoriteList.refresh();

          } else {
            this.$refs.playHistory.refresh();
          }
        }, 20);
      },//显示切换
      selectSong(song) {
        // 点击插入当前播放列表
        this.insertSong(new Song(song));
      },//选择歌曲
      switchItem(index) {
        this.currentIndex = index
      },//选项卡按钮切换
      allPlay() {
        if (this.currentIndex === 0) {
          if (this.favoriteList) {
            this.setSequenceList(this.favoriteList.slice());
            this.setPlayList(this.favoriteList.slice());
          }
        } else {
          if (this.playHistory) {
            this.setSequenceList(this.playHistory.slice());
            this.setPlayList(this.playHistory.slice());
          }
        }
        this.setCurrentIndex(0);
        this.setPlayingState(true);
      },//随机播放全部
      ...mapActions(["insertSong"]),//异步插入歌曲
      ...mapMutations({
        setPlayList: "SET_PLAYLIST",
        setSequenceList: "SET_SEQUENCE_LIST",
        setCurrentIndex: "SET_CURRENT_INDEX",
        setPlayingState: "SET_PLAYING_STATE"
      }) //修改vuex状态
    },
    created() {

    },
    mounted() {
      this.show()
     
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
