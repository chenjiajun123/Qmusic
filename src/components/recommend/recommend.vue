<template>
  <div id="recommend">
    <scroll class="recommend-content" ref="scroll">
      <div ref="recommendContent">
        <div class="slider-wrapper">
          <div v-if="recommends.length" class="slider-wrapper">
            <slider>
              <div v-for="(item, index) in recommends" :key="index">
                <a :href="item.linkUrl">
                  <img class="needclick" :src="item.picUrl">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="font14 list-title">热门歌单推荐</h1>
          <ul class="list-content">
            <li v-for="(item,index,key) in DiscList" :index="index" :key="key" class="list-item">
              <img v-lazy="item.imgurl" class="list-item-img">
              <div class="list-item-text">
                <h2 class="font12">{{item.creator.name}}</h2>
                <p class="font14">{{item.dissname}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!DiscList.length">
        <v-loading></v-loading>
      </div>
    </scroll>
  </div>
</template>
<script>
  import {
    getRecommend,
    getDiscList
  } from '../../assets/JS/api/recommend.js'
  import loading from '../base/loading/loading.vue'
  import scroll from '../base/scroll/scroll'
  import slider from '../base/slider/slider'
  import {
    playlistMixin
  } from '../../assets/JS/common/mixin'
  export default {
    mixins: [playlistMixin],
    //import引入的组件需要注入到对象中才能使用
    components: {
      "v-loading": loading,
      slider,
      scroll
    },
    data() {
      return {
        // 轮播图
        recommends: [],
        // 歌单列表
        DiscList: []
      };
    },
    computed: {},
    watch: {},
    methods: {
      // 判断是否有歌曲在播放
      handlePlaylist(playlist) {
        if (this.$refs.recommendContent) {
          const bottom = playlist.length > 0 ? '1.8rem' : 0
          this.$refs.recommendContent.style.paddingBottom = bottom
          this.$refs.scroll.refresh();
        }
      },
      // 获取轮播图数据
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code === 0) {
            this.recommends = res.data.slider;
          }

        })
      },
      // 获取歌单数据
      _getDiscList() {
        getDiscList().then((res) => {
          if (res.code === 0) {
            this.DiscList = res.data.list
          }
        })
      }
    },
    created() {
      this._getRecommend();
      this._getDiscList();
    },
    mounted() {
      // 刷新scroll
      this.$refs.scroll.refresh()
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
