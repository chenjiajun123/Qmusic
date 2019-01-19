<template>
  <div id="loading">
    <img width="30" height="30" src="./loading.gif">
    <p class="text">{{title}}</p>
  </div>
</template>
<script>
  export default {
    //import引入的组件需要注入到对象中才能使用
    props: {
      title: {
        type: String,
        default: '正在载入....'
      }
    },
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
