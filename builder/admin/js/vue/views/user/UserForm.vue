<template>
  <form>
    <v-text title="Username" v-model="editedItem.username" disabled/>
    <v-text title="Name" v-model="editedItem.name"/>
    <v-text title="Email" v-model="editedItem.email"/>
    <v-text title="Phone" v-model="editedItem.phone"/>

    <a @click="submit" class="btn btn-primary">Submit</a>
  </form>
</template>

<script>
  import VText from '../../widgets/VText';
  import CrudMixin from '../../minxins/form.minxin'
  export default {
    mixins: [ CrudMixin ],
    components: {
      VText,
    },
    props: {},

    data() {
      return {
        entity: 'users', //required
        valid: true
      };
    },
    watch: {
    },
    methods:{
      submit(){
        this.saveItem(this.editedItem)
      }
    },
    created(){
      window.UserForm = this
    },
    computed: {},
  };
</script>

<style scoped>

</style>