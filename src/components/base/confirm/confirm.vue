<template>
  <transition name="confirm-fade">
    <div class="confirm" v-show="showFlag">
      <div class="confirm-wrapper">
        <div class="confirm-content">
          <p class="text font16">{{text}}</p>
          <div class="operate">
            <div @click="cancel" class="operate-btn left font16">{{cancelText}}</div>
            <div @click="confirm" class="operate-btn font16">{{confirmText}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      cancelText: {
        type: String,
        default: '取消'
      }
    },
    components: {},
    data() {
      return {
        showFlag: false //弹框显示和隐藏
      };
    },
    computed: {},
    watch: {},
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      // 弹框取消
      cancel() {
        this.hide()
        this.$emit("cancel")
      },
      // 弹框确定
      confirm() {
        this.hide()
        this.$emit("confirm")
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
