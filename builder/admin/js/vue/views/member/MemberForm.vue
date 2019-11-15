<template>
  <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit">
    <field label="Username"  class="col-sm-10" >
      <v-input name="username" rules="required|min:3|max:30" v-model="editedItem.username" maxlength="30"/>
    </field>
    <field label="Chức vụ" class="col-sm-10">
      <div class="block col-sm-10">
        <radio color="is-success" v-for="role in roleSelect" :key="role" v-model="editedItem.role" name="name"
               :val="role"> {{role}}
        </radio>
      </div>
    </field>
    <field label="Mật khẩu" class="col-sm-10" >
      <v-input type="password" name="Mật khẩu" v-model="editedItem.password" rules="required|min:6|max:20" vid="password"/>
    </field>
    <field label="Xác nhận mật khẩu" class="col-sm-10" >
      <v-input name="Xác nhận mật khẩu" type="password" v-model="editedItem.rePassword" rules="required|confirmed:password"/>
    </field>
    <field label="Tên" class="col-sm-10">
      <v-input title="Tên" v-model="editedItem.name"/>
    </field>
    <field label="Email" class="col-sm-10" >
      <v-input name="Email" v-model="editedItem.email" rules="required|email"/>
    </field>
    <field  label="Số điện thoại" class="col-sm-10">
      <v-input rules="phone" v-model="editedItem.phone"/>
    </field>
    <button type="submit" class="btn btn-primary">Submit</button>
  </ValidationObserver>
</template>

<script>
  import {ROLE_TYPES} from '../../utils/constant';
  import {Field, Radio, VInput} from '../../widgets';
  import {ValidationObserver} from 'vee-validate';

  export default {
    components: {
      VInput,
      Field,
      ValidationObserver,
      Radio,
    },
    props: {},

    data() {
      return {
        editedItem: {
          role: 'admin',
        },
        roleSelect: Object.values(ROLE_TYPES),
      };
    },
    watch: {},
    mounted() {
      this.$route.meta.title = this.$route.params.id ? 'Cập nhật thành viên' : 'Thêm thành viên';
    },
    methods: {
      async onSubmit() {
        const isValid = await this.$refs.form.validate();
        if (!isValid) return;
        this.$app.notification.open({
          message: 'Something happened correctly!',
          type: 'is-success',
        });
      },
    },
    beforeCreate() {
      window.MemberForm = this;
    },
    created() {
      // console.log(MemberModel.fields())
    },
    computed: {},
  };
</script>

<style scoped>

</style>