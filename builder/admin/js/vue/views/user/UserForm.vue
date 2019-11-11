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
  import CrudMixin from '../../minxins/crud_request.minxin'
  export default {
    mixins: [ CrudMixin ],
    components: {
      VText,
    },
    props: {
      data: {
        type: Object,
        default: {
          username: '',
          email: '',
          phone: '',
          name: '',
        },
      },
    },
    data() {
      return {
        form: Object.assign({}, this.data),
      };
    },
    watch: {
      data: function(newVal) { // watch it
        this.form = Object.assign({}, newVal);
      },
    },
    computed: {},
  };
</script>

<style scoped>

</style>