<template>
    <i class="icon" v-html="loadIcon"></i> 
</template>

<script>
export default {
  props: {
    name: {},
    size: {
      default: 'normal',
    },
    modifier: {
      default: null,
    },
    fixAlign: {
      default: true,
    },
  },
  components: {
  },
  computed: {
    loadIcon(){
      return require(`../../assets/images/icons/${this.name}.svg`)
    }
  },
  created(){
    // console.log(this.loadIcon);

  }
}
</script>

<style  scoped>
.icon {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 18px;
    height: 18px;
    margin: 0 .3rem;
    font-weight: bold;
    fill: currentColor;
}
.icon svg {
    display: inline-block;
    vertical-align: top;
    width: 100%;
    height: 100%;
}
</style>