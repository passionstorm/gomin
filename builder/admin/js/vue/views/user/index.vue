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
          <th scope="row">{{i.username}} </th>
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
        <user-form  :data="itemSelected" @submit="editModal = false"/>
      </template>
    </modal>
  </div>
</template>

<script>
  import Icon from '../../widgets/Icon';
  import json from './user.json';
  import Modal from '../../widgets/Modal';

  export default {
    components: {Modal, Icon,
      UserForm: () => import('./UserForm')
    },
    data() {
      return {
        users: json,
        itemSelected: {},
        editModal: false,
      };
    },
    computed: {
      headers() {
        // return this.Model.nonRelationFields()
        return [
          'username', 'name', 'email', 'phone', '',
        ];
      },
    },
    methods: {
      edit(item) {
        this.itemSelected = item;
        this.editModal = true;
      },
    },
    watch: {
      itemSelected(val) {
      },
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
