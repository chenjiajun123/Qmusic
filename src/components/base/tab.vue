<template>
  <div id="tab">
    <router-link to="/recommend" tag="div" class="tab-item">
      <span class="tab-link font14">推荐</span>
    </router-link>
    <router-link to="/singer" tag="div" class="tab-item">
      <span class="tab-link font14">歌手</span>
    </router-link>
    <router-link to="/rank" tag="div" class="tab-item">
      <span class="tab-link font14">排行</span>
    </router-link>
    <router-link to="/search" tag="div" class="tab-item">
      <span class="tab-link font14">搜索</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      return {

      };
    },
    computed: {},
    watch: {},
    methods: {

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
