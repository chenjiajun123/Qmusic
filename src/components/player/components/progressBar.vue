<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove"
        @touchend="progressTouchEnd">
        <div class="progress-btn" ref="progressBtn"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      return {
        progressBtnWidth: '',
        touch: {}
      };
    },
    computed: {},
    watch: {
      //歌曲播放百分比监听
      percent(newPercent) {
        if (newPercent >= 0 && !this.touch.initiated) {
          // !this.touch.initiated在禁止拖动时才可以移动
          this.progressBtnWidth = this.$refs.progressBtn.clientWidth / 2; // 按钮宽度
          const barWidth = this.$refs.progressBar.clientWidth - this.progressBtnWidth; // 总宽-按钮宽度(进度条最大宽度)
          const offsetWidth = newPercent * barWidth; //进度条宽度

          this._offset(offsetWidth); //设置进度条宽度
        }
      }
    },
    methods: {
      //进度条拖动
      progressTouchStart(e) {
        this.touch.initiated = true
        this.touch.startX = e.touches[0].pageX
        this.touch.left = this.$refs.progress.clientWidth;
      },
       //进度条拖动
      progressTouchMove(e) {
        if (!this.touch.initiated) {
          return
        }
        const deltaX = e.touches[0].pageX - this.touch.startX
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - this.progressBtnWidth, Math.max(0, this.touch
          .left + deltaX))
        this._offset(offsetWidth)

      },
       //进度条拖动
      progressTouchEnd(e) {
        this.touch.initiated = false
        this._triggerPercent()
      },
       //进度条拖动后播放百分比变化
      _triggerPercent() {
        const barWidth = this.$refs.progressBar.clientWidth - this.progressBtnWidth;
        const percent = this.$refs.progress.clientWidth / barWidth;
        this.$emit("percentChange", percent);
      },
      //进度条点击
      progressClick(e) {
        const rect = this.$refs.progressBar.getBoundingClientRect();
        const offsetWidth = e.pageX - rect.left
        this._offset(offsetWidth)
        this._triggerPercent();
      },
      //进度条长度
      _offset(offsetWidth) {
        this.$refs.progress.style.width = `${offsetWidth}px`;
        this.$refs.progressBtn.style.transform = `translate3d(${offsetWidth}px,0,0)`;
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
