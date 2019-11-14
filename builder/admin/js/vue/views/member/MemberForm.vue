<template>
  <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit">
    <field label="Username" rules="required|min:3|max:30" class="col-sm-10" >
      <v-input name="ysj" v-model="editedItem.username" maxlength="30"/>
    </field>
    <field label="Chức vụ" class="col-sm-10">
      <div class="block col-sm-10">
        <radio color="is-success" v-for="role in roleSelect" :key="role" v-model="editedItem.role" name="name"
               :val="role"> {{role}}
        </radio>
      </div>
    </field>
    <field label="Mật khẩu" class="col-sm-10" rules="required|min:6|max:20" vid="password">
      <v-input type="password" v-model="editedItem.password"/>
    </field>
    <field label="Xác nhận mật khẩu" class="col-sm-10" rules="required|confirmed:password">
      <v-input type="password" v-model="editedItem.rePassword"/>
    </field>
    <field label="Tên" class="col-sm-10">
      <v-input title="Tên" v-model="editedItem.name"/>
    </field>
    <field label="Email" class="col-sm-10" rules="required|email">
      <v-input v-model="editedItem.email"/>
    </field>
    <field label="Số điện thoại" class="col-sm-10">
      <v-input v-model="editedItem.phone"/>
    </field>
    <button type="submit" class="btn btn-primary">Submit</button>
  </ValidationObserver>
</template>

<script>
  import {ROLE_TYPES} from '../../utils/constant';
  import {Field, Radio, Text, VInput} from '../../widgets';
  import {ValidationObserver} from 'vee-validate';

  export default {
    components: {
      VInput,
      VText: Text,
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