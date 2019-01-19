<template>
  <div class="song-list">
    <ul>
      <li v-for="(item,index,key) in songs" :index="index" :key="index" class="song-list-item" @click="selectItem(item,index)">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)" class="font18">{{getRankText(index)}}</span>
        </div>
        <div class="content">
          <h2 class="name font14">{{item.name}}</h2>
          <p class="desc font14">{{getDesc(item)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: {
      songs: {
        type: Array
      },
      rank: {
        type: Boolean,
        default: false
      }
    },
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      return {

      };
    },
    computed: {},
    watch: {},
    methods: {
      //获取专辑
      getDesc(item) {
        return `${item.singer}-${item.album}`
      },
      //排名整合
      getRankCls(index) {
        if (index <= 2) {
          return `icon icon${index}`
        } else {
          return 'text'
        }
      },
      //排名文本
      getRankText(index) {
        if (index > 2) {
          return index + 1
        }
      },
      //选择歌曲
      selectItem(item, index) {
        this.$emit("select", item, index)
      }
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
