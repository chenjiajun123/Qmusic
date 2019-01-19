<template>
  <div id="rank">
    <scroll class="rank-list" ref="rankList">
      <div ref="rank">
        <ul>
          <li class="list-item" v-for="(item,index,key) in rank" :key="index" :index="index" @click="selectRank(item)">
            <img v-lazy="item.picUrl" class="left-pic">
            <div class="right-content">
              <p v-for="(list,index,key) in item.songList" :index="index" :key="index" class="song font12">
                <span>{{index+1}}.</span>
                <span>{{list.singername}}-{{list.songname}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" v-show="!rank.length">
        <v-loading></v-loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
  import {
    getRankList
  } from '../../assets/JS/api/rank.js'
  import scroll from '../base/scroll/scroll'
  import loading from '../base/loading/loading.vue'
  import {
    playlistMixin
  } from '../../assets/JS/common/mixin'
  export default {
    mixins: [playlistMixin],
    //import引入的组件需要注入到对象中才能使用
    components: {
      scroll,
      "v-loading": loading
    },
    data() {
      return {
        rank: []
      };
    },
    computed: {},
    watch: {},
    methods: {
      //判断是否有歌曲在播放
      handlePlaylist(playlist) {
        if (this.$refs.rank) {
          const bottom = playlist.length > 0 ? '1.8rem' : 0
          this.$refs.rank.style.paddingBottom = bottom
          this.$refs.rankList.refresh();
        }

      },
      // 获取排名列表
      _getRankList() {
        getRankList().then((res) => {

          if (res.code === 0) {
            this.rank = res.data.topList
          }
        })
      },
      //排名内容选择
      selectRank(item) {
        this.$router.push({
          name: 'rankDetail',
          params: {
            item: item
          }
        })

      },
    },
    created() {
      this._getRankList()

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
