<template>
  <form>
    <v-text title="Username" v-model="editedItem.username" disabled/>
    <div class="form-group">
      <label class="control-label">Role User</label>
      <radio v-for="role in  roleSelect" title="role"/>
    </div>
    <v-text title="Mật khẩu" v-model="editedItem.password"/>
    <v-text title="Xác nhận mật khẩu" v-model="editedItem.rePassword"/>
    <v-text title="Tên" v-model="editedItem.name"/>
    <v-text title="Email" v-model="editedItem.email"/>
    <v-text title="Số điện thoại" v-model="editedItem.phone"/>
    <v-text title="Dia chi"></v-text>

    <a @click="submit" class="btn btn-primary">Submit</a>
  </form>
</template>

<script>
  import {ROLE_TYPES} from '../../utils/constant'
  import {Text, Radio} from '../../widgets';
  import MemberModel from '../../store/models/MemberModel';
  export default {
    components: {
      VText: Text,
      Radio
    },
    props: {},

    data() {
      return {
        editedItem: {},
        roleSelect: Object.values(ROLE_TYPES),
      };
    },
    watch: {

    },
    mounted(){
      this.$route.meta.title = this.$route.params.id ? "Cập nhật thành viên" : "Thêm thành viên"
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