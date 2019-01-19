<template>
  <div id="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
      <span class="dot" :class="{active:currentIndex === index}" v-for="(item, index) in dots" :key="index"></span>
    </div>
  </div>
</template>
<script>
  import {
    addClass
  } from '../../../assets/Js/common/dom.js'
  import BScroll from 'better-scroll'
  export default {
    props: {
      autoPlay: {
        type: Boolean,
        default: true
      },
      loop: {
        type: Boolean,
        default: true
      },
      interval: {
        type: Number,
        default: 1000
      }
    },
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
      return {
        dots: [],
        currentIndex: 0
      };
    },
    computed: {},
    watch: {},
    methods: {
      //图片轮播
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children
        let width = 0
        let slideWidth = this.$refs.slider.clientWidth
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')

          child.style.width = slideWidth + 'px'
          width += slideWidth
        }
        if (this.loop && !isResize) {
          width += 2 * slideWidth
        }
        this.$refs.sliderGroup.style.width = width + 'px'
      },
      _initSlider() {
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,
          scrollY: false,
          momentum: false,
          snap: {
            loop: this.loop,
            threshold: 0.3,
            speed: 400
          },
          click: true
        })

        this.slider.on('scrollEnd', () => {
          let pageIndex = this.slider.getCurrentPage().pageX

          this.currentIndex = pageIndex

          if (this.autoPlay) {
            clearTimeout(this.timer)
            this._play()
          }
        })
      },
      //轮播图下面的小焦点
      _initDots() {
        this.dots = new Array(this.children.length)
      },
      //轮播开始
      _play() {

        this.timer = setTimeout(() => {
          this.slider.next()
        }, this.interval)
      }
    },
    created() {

    },
    mounted() {
      this._setSliderWidth()
      setTimeout(() => {
        this._initDots()
        this._initSlider()
        if (this.autoPlay) {
          this._play()
        }
      }, 20)
     //屏幕切换
      window.addEventListener('resize', () => {
        if (!this.slider) {
          return
        }
        this._setSliderWidth(true)
        this.slider.refresh()
      })
    },
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {
      clearTimeout(this.timer)
    },
    activated() {},
  }

</script>
<style>

</style>
