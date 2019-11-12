<template>
  <div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
        <tr>
          <th v-for="header in headers" scope="col">{{header}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="i in users">
          <th scope="row">{{i.username}}</th>
          <td>{{i.name}}</td>
          <td>{{i.email}}</td>
          <td>{{i.phone}}</td>
          <td>
            <div class="d-flex">
              <button type="button" class="btn" @click="edit(i)">
                <icon class="btn btn-icon" name="pen" color="red"></icon>
              </button>
              <icon class="btn btn-icon" name="trash"></icon>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <modal :is-icon-close="true" v-model="editModal">
      <template slot="body">
        <user-form @submit="editModal = false"/>
      </template>
    </modal>
  </div>
</template>

<script>
  import Icon from '../../widgets/Icon';
  import json from './user.json';
  import Modal from '../../widgets/Modal';
  import UserForm from './UserForm'
  import {ENTITY, default as UserModel } from '../../store/models/UserModel';
  export default {
    components: {Modal, Icon, UserForm},
    data() {
      return {
        users: json,
        entity: ENTITY,
        editModal: false,
      };
    },
    computed: {
      headers() {
        // return this.Model.nonRelationFields()
        return [
          '','username', 'name', 'email', 'phone', '',
        ];
      },
    },
    created(){
      console.log(UserModel.fieldsKeys());
    },
    methods: {
      edit(item) {
        // this.setEditedItem(item)
        window.UserForm.setEditedItem(item)
        this.editModal = true;
      },
    },
    async beforeMount(){
      await UserModel.all()
    },
  };
</script>
<style scoped>
  .btn-icon {
    display: block;
    width: 48px;
    cursor: pointer;
  }
</style>
