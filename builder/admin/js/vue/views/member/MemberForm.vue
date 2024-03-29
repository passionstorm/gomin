<template>
  <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit">
    <field required="true" label="Username" class="col-md-6">
      <v-input name="username" rules="required|min:3|max:30|username" v-model="editedItem.username" maxlength="30"/>
    </field>
    <field required="true" label="Chức vụ" class="col-md-6">
      <div class="block col-sm-12">
        <radio color="is-success" v-for="role in roleSelect" :key="role" v-model="editedItem.role" name="name"
               :val="role"> {{role}}
        </radio>
      </div>
    </field>
    <field required="true" label="Mật khẩu" class="col-md-6">
      <v-input type="password" name="Mật khẩu" v-model="editedItem.password" rules="required|min:6|max:20"
               vid="password"/>
    </field>
    <field required="true" label="Xác nhận mật khẩu" class="col-md-6">
      <v-input name="Xác nhận mật khẩu" type="password" v-model="editedItem.rePassword"
               rules="required|confirmed:password"/>
    </field>
    <field required="true" label="Tên" class="col-md-6">
      <v-input name="Tên" title="Tên" v-model="editedItem.name" rules="required"/>
    </field>
    <field required="true" label="Email" class="col-md-6">
      <v-input name="Email" v-model="editedItem.email" rules="required|email"/>
    </field>
    <field label="Số điện thoại" class="col-md-6">
      <v-input rules="phone" v-model="editedItem.phone"/>
    </field>
    <div class="col-sm-10"
        style="display:flex;
           box-shadow: 0 4px 8px 0 rgba(0,0,0,0.6);
            padding: 0.5em 2em 0.5em 0.1em;
            bottom: 0;
            margin-right: -20px;
            position: fixed;
            background: rgba(0, 0, 0, 0.4);">
      <div class="col-sm-12" style="display: flex">
        <router-link :to="{name: 'member_list'}" class="btn btn-d">Quay lai</router-link>
        <div class="mr-auto"></div>
        <button type="submit" class="btn btn-primary"><b>Submit</b></button>
      </div>
    </div>
  </ValidationObserver>
</template>

<script>
  import {ROLE_TYPES} from '../../utils/constant';
  import {Collapse, Field, Icon, Radio, VInput} from '../../widgets';
  import {extend, ValidationObserver} from 'vee-validate';
  import MemberModel from '../../store/models/MemberModel';

  export default {
    components: {
      VInput,
      Field,
      ValidationObserver,
      Collapse,
      Icon,
      Radio,
    },
    props: {},
    data() {
      return {
        editedItem: {
          role: 'admin',
        },
        id: this.$route.params.id,
        roleSelect: Object.values(ROLE_TYPES),
      };
    },
    watch: {},
    mounted() {
      extend('username', (value, {other}) => {
        if (!value.match(/^[a-zA-Z0-9]+$/)) return 'username chưa đúng';

        if (this.id && value === this.editedItem.username) return true;

        if (MemberModel.query().where('username', value).first()) return 'username đã tốn tại';

        return true;
      });

    },
    methods: {
      async onSubmit() {
        const isValid = await this.$refs.form.validate();
        if (!isValid) return;

        if (this.id) {
          await MemberModel.$update({
            data: this.editedItem,
          });
          this.$app.notification.open({
            message: 'Đã cập nhật thông tin!',
            type: 'is-success',
          });
        } else {
          await MemberModel.$create({
            data: this.editedItem,
          });
          this.$app.notification.open({
            message: 'Đã thêm thành viên mới!',
            type: 'is-success',
          });
          this.resetForm();
        }
      },
      resetForm() {
        this.$refs.form.reset();
        this.editedItem = Object.assign({}, {});
      },
    },
    beforeMount() {
      this.$route.meta.title = this.id ? 'Cập nhật thành viên' : 'Thêm thành viên';
      if (!this.id) return;
      this.editedItem = Object.assign({}, MemberModel.query().find(this.id));
      this.editedItem.rePassword = this.editedItem.password;
    },
    created() {
    },
    computed: {},
  };
</script>

<style scoped>

</style>