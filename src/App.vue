<template>
  <div id="app">
    <v-header></v-header>
    <v-tab></v-tab>
    <transition name="fade1">
    <router-view></router-view>
    </transition>
    <v-player></v-player>
  </div>
</template>

<script>
  import header from './components/base/header.vue'
  import tab from './components/base/tab.vue'
  import player from './components/player/player.vue'
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
      "v-header": header,
      "v-tab":tab,
      "v-player":player
    },
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
