<template>
  <div id="singer-detail">
    <v-musicList :bgImg="bgImg" :title="title" :songs="songs"></v-musicList>
  </div>
</template>
<script>
  import musicList from '../base/musicList/musicList.vue'
  import {
    getSingerDetail,
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
        Id: this.$route.params.singer.id,  //列表页到详情页传过来的ID
        songs: [], //歌曲
        rank: false //是否需要排名icon
      };
    },
    computed: {
      bgImg() {
        return this.$route.params.singer.avatar
      },
      //详情页大图
      title() {
        return this.$route.params.singer.name
      }
      //详情页标题
    },
    watch: {},
    methods: {
      _getDetail() {
        if (!this.Id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.Id).then((res) => {

          if (res.code === 0) {
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
        //获取详情页数据
      },
      _normalizeSongs(list) {
        let ret = []
        list.map((item, index, key) => {
          let {
            musicData
          } = item
          getSongVkey(musicData.songmid).then((res) => {

            const vkey = res.data.items[0].vkey
            if (musicData.songid && musicData.albummid) {
              ret.push(createSong(musicData, vkey))

            }
          })
        })
        return ret
      }
      //在获取到的数据进行整合封装
    },
    created() {
      this._getDetail()
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
