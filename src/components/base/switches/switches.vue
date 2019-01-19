<template>
  <ul class="switches">
    <li class="switches-item" v-for="(item,index,key) in switches" @click.stop="switchItem(index)" :index="index" :key="index"
      :class="{'active':currentIndex === index}">
      <span class="font12">{{item.name}}</span>
    </li>
  </ul>
  </div>
</template>
<script>
  export default {
    props: {
      switches: {
        type: Array

      },
      currentIndex: {
        type: Number,
        default: 0
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
      switchItem(index) {
        this.$emit("switch", index);
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
