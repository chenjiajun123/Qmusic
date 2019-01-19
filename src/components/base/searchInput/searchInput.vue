<template>
  <div class="searchInput-box">
    <div class="searchInput">
      <img src="../../../assets/images/togo.png" class="togo" alt="搜索" title="搜索">
      <input ref="query" v-model="query" class="input-box font12" :placeholder="placeholder" />
      <img v-show="query" class="toclear" src="../../../assets/images/toclear.png" alt="清除" title="清空" @click="clear">
    </div>
  </div>
</template>
<script>
  import {
    debounce
  } from '../../../assets/JS/common/util'
  export default {
    props: {
      placeholder: {
        type: String,
        default: "搜索歌曲、歌手"
      }
    },
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      return {
        query: ""
      };
    },
    computed: {},
    watch: {},
    methods: {
      // 清除input
      clear() {
        this.query = "";
      },
      // 失去焦点解决键盘弹出问题
      blur() {
        // 文本框失焦，移动端去掉小键盘
        this.$refs.query.blur();
      },
      //热门搜索点击
      queryHot(queryHot) {
        // 热门搜索
        this.query = queryHot;
      },
    },
    created() {
      //监听input。采取节流
      this.$watch(
        "query",
        debounce(newQuery => {
          // 不超过200ms函数节流
          this.$emit("query", newQuery);
        }, 200)
      );
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
