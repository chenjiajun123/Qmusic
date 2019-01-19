<template>
  <transition name="drop">
    <div class="top-tip" v-show="showFlag">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
  export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      return {
        showFlag: false  //弹出标题显示和隐藏
      };
    },
    computed: {},
    watch: {},
    methods: {
      show() {
        this.showFlag = true
        this.timer = setTimeout(() => {
          this.hide()
        }, 1000);
      },
      hide() {
        this.showFlag = false
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
