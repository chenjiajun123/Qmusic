<template>
  <div id="rank-detail">
    <v-musicList :bgImg="bgImg" :title="title" :songs="songs" :rank="rank"></v-musicList>
  </div>
</template>
<script>
  import musicList from '../base/musicList/musicList.vue'
  import {
    getMusicList
  } from '../../assets/JS/api/rank'
  import {
    getSongVkey
  } from '../../assets/JS/api/singer'
  import {
    createSong
  } from '../../assets/JS/common/song'
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      "v-musicList": musicList
    },
    data() {
      return {
        Id: '',//id
        bgImg: '',//大图
        title: '',//标题
        songs: [],
        rank: true//是否需要排名按钮
      };
    },
    computed: {},
    watch: {},
    methods: {
      // 获取排名详情
      _getDetail() {
        if (this.$route.params.item == undefined) {
          this.$router.push('/rank')
          return
        } else {
          this.Id = this.$route.params.item.id
          this.bgImg = this.$route.params.item.picUrl
          this.title = this.$route.params.item.topTitle
          getMusicList(this.Id).then((res) => {
            if (res.code === 0) {
              this.songs = this._normalizeSongs(res.songlist)
            }
          })
        }
      },
      //详情数据整合封装
      _normalizeSongs(list) {
        let ret = []
        list.map((item, index, key) => {
          let musicData = item.data
          getSongVkey(musicData.songmid).then((res) => {
            const vkey = res.data.items[0].vkey
            if (musicData.songid && musicData.albummid) {
              ret.push(createSong(musicData, vkey))

            }
          })
        })
        return ret
      }
    },
    created() {

    },
    mounted() {

      this._getDetail()
    },
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {

    },
    beforeDestroy() {},
    destroyed() {},
    activated() {},
  }

</script>
<style>

</style>
