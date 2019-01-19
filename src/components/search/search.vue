<template>
  <div id="search">
    <searchInput ref="searchInput" @query="queryChange" :query="query"></searchInput>
    <scroll class="scroll" ref="scroll">
      <div class="scroll-box" ref="record">
        <div class="hotkey">
          <h1 class="title font14">热门搜索</h1>
          <span @click="hotkeyClick(item)" class="hotCon font12" v-for="(item, index) in hotkey" :key="index">{{ item.k
            }}</span>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
  import searchInput from '../base/searchInput/searchInput'
  import {
    getHotKey
  } from '../../assets/JS/api/search'
  import scroll from "../base/scroll/scroll"
  import {
    playlistMixin
  } from '../../assets/JS/common/mixin'
  export default {
    mixins: [playlistMixin],
    //import引入的组件需要注入到对象中才能使用
    components: {
      searchInput,
      scroll,
    },
    data() {
      return {
        hotkey: [],//热搜歌曲或歌手
        query: "" // 当前搜索框内容
      };
    },
    computed: {},
    watch: {},
    methods: {
      //input内容改变
      queryChange(query) {
        this.query = query;
      },
      //判断是否有歌曲在播放
      handlePlaylist(playlist) {
        if (this.$refs.record) {
          const bottom = playlist.length > 0 ? '1.8rem' : 0
          this.$refs.record.style.paddingBottom = bottom
        }
      },
      //热搜歌曲或歌手点击改变input
      hotkeyClick(item) {
        this.$refs.searchInput.queryHot(item.k);
      },
      // 获取热搜歌曲或歌手
      _getHost() {
        getHotKey().then(res => {
          if (res.code === 0) {
            this.hotkey = res.data.hotkey.slice(0, 10);

          }
        });
      },
    },
    created() {
      this._getHost();
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
