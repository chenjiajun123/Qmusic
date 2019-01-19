<template>
  <div id="singer">
    <v-singerList :Singers="singers" @select="selectSinger"></v-singerList>
    <router-view></router-view>
  </div>
</template>
<script>
  import {
    getSingerList
  } from '../../assets/JS/api/singer.js'
  import Singer from '../../assets/JS/common/Singer.js'
  import singerList from './singerList/singerlist.vue'
  import tab from '../base/tab.vue'
  import header from '../base/header.vue'
  const HOT_NAME = '热门'
  const HOT_SINGER_LEN = 10
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      scroll,
      "v-singerList": singerList,

    },
    data() {
      return {
        // 歌手数据
        singers: [],
      };
    },
    computed: {},
    watch: {},
    methods: {
      selectSinger(singer) {
        this.$router.push({
          name: 'singerDetail',
          params: {
            singer: singer
          }
        })
      },
      //选择歌手
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === 0) {
            this.singers = this.SortSinger(res.data.list)
          }
        })
      },
      // 获取歌手数据
      SortSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          },
        }
        list.map((item, index, key) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          if (!map[item.Findex]) {
            map[item.Findex] = {
              title: item.Findex,
              items: []
            }
          }
          map[item.Findex].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        let ret = [];
        let hot = [];
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })

        return hot.concat(ret)
      }
      // 将获取到的歌手数据进行排列整合到想要的数据类型
    },
    created() {
      this._getSingerList()
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
