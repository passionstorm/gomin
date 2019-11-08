<template>
    <i class="icon" v-html="loadIcon"></i> 
</template>

<script>
export default {
  name: 'icon',
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
      return require(`../assets/images/icons/${this.name}.svg`)
    }
  },
  created(){
    // console.log(this.loadIcon);

  }
}
</script>

<style  scoped>
.icon {
    display: inline-block;
    font-size: 1.1rem;
    font-weight: bold;
    fill: currentColor;
}
.icon svg {
    width: 100%;
    height: 100%;
}
</style>