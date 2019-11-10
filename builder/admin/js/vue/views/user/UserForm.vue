<template>
  <form>
    <v-text title="Username" v-model="form.username" disabled/>
    <v-text title="Name" v-model="form.name"/>
    <v-text title="Email" v-model="form.email"/>
    <v-text title="Phone" v-model="form.phone"/>

  </form>
</template>

<script>
  import VText from '../../widgets/VText';
  export default {
    components:{
      VText
    },
    props:{
      data: {
        type: Object,
        default: {
          username: '',
          email: '',
          phone: '',
          name: '',
        },
      }
    },
    data(){
      return{
        f: this.data
      }
    },
    watch: {
      data: function(newVal, old) { // watch it
        console.log(newVal);
        this.f = newVal
      }
    },
    computed:{
      form: {
        get: function() {
          return this.data
        },
        set: function(){

        }
      }
    }
  };
</script>

<style scoped>

</style>