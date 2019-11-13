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
  import {Text} from '../../widgets';
  import MemberModel from '../../store/models/MemberModel';
  export default {
    // mixins: [CrudMixin],
    components: {
      VText: Text,
    },
    props: {},

    data() {
      return {
        editedItem: {},
      };
    },
    watch: {
      '$route.params.id': function(val) {
        this.$route.meta.title = val ? "Cập nhật thành viên" : "Thêm thành viên"
      }
    },
    methods: {
      async submit() {
        await MemberModel.$create({data :  this.editedItem})
      }
    },
    beforeCreate() {
      window.MemberForm = this

    },
    created(){
      // console.log(MemberModel.fields())
    },
    computed: {},
  };
</script>

<style scoped>

</style>