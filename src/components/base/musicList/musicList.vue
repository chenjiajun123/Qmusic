<template>
  <div class="music-list">
    <i class="icon-back font18" @click="back"></i>
    <h1 class="font18 music-list-title">{{title}}</h1>
    <div :style="bgStyle" class="bgImg" ref="bgImg">
      <div class="play">
        <i class="icon-play font16"></i>
        <span class="font12">随机播放全部</span>
      </div>
      <div class="filter">
      </div>
    </div>
    <scroll :proty-type="protyType" :listen-scroll="listenScroll" class="list" ref="list">
      <div class="song" ref="song">
        <v-song :songs="songs" :rank="rank" @select="selectItem"></v-song>
      </div>
    </scroll>
    <div class="loading-container" v-show="!songs.length">
      <loading></loading>
    </div>
  </div>
</template>
<script>
  import {
    mapActions
  } from "vuex";
  import scroll from '../scroll/scroll.vue'
  import songList from '../songList/songList.vue'
  import loading from '../loading/loading.vue'
  import {
    playlistMixin
  } from '../../../assets/JS/common/mixin'
  export default {
    mixins: [playlistMixin],
    //import引入的组件需要注入到对象中才能使用
    props: {
      bgImg: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      },
      songs: {
        type: Array,
        default: ''
      },

      rank: {
        type: Boolean,
        default: false
      }
    },
    components: {
      scroll,
      "v-song": songList,
      loading
    },
    data() {
      return {

      };
    },
    computed: {
      bgStyle() {
        return `background-image:url(${this.bgImg})`
      }
    },
    watch: {},
    methods: {
      //判断是否有歌曲在播放
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '1.8rem' : 0
        this.$refs.song.style.paddingBottom = bottom
        this.$refs.list.refresh();

      },
      //回退
      back() {
        this.$router.go(-1);
      },
      //选择歌曲
      selectItem(item, index) {
        let that = this
        this.selectPlay({
          list: that.songs,
          index: index
        })
      },
      ...mapActions(["selectPlay"])
    },
    created() {
      this.protyType = 3
      this.listenScroll = true
    },
    mounted() {
      // 列表更新
      this.$refs.list.refresh()
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
