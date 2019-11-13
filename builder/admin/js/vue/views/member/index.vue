<template>
  <div>
    <div class="d-flex mb-2">
      <div class="mr-auto"></div>
      <div>
        <a v-show="selectedItems.length > 0" class="btn btn-danger" href="javascript:;">Xoá</a>
        <router-link to="edit" class="btn btn-d">Thêm thành viên</router-link>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <tr>
              <th v-for="header in headers" scope="col">{{header}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="i in items">
              <td><check v-model="selectedItems" :val="i.username" checked/></td>
              <td><img :src="i.avatar"/></td>
              <td>{{i.username}}</td>
              <td>{{i.name}}</td>
              <td>{{i.email}}</td>
              <td>{{i.phone}}</td>
              <td>
                <div class="d-flex">
                  <router-link class="btn" :to="{name: 'edit', params: {id: '1'}}" >
                    <icon class="btn btn-icon" name="pen" color="red"></icon>
                  </router-link>

                  <button type="button" class="btn" @click="del(i)">
                    <icon class="btn btn-icon" name="trash"></icon>
                  </button>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import json from './user.json';
  import {Modal, Icon, Pin, Check, Radio} from '../../widgets/index';
  import {ENTITY, default as MemberModel} from '../../store/models/MemberModel';

  export default {
    components: {Modal, Icon, Check, Radio},
    data() {
      return {
        items: json,
        entity: ENTITY,
        editModal: false,
        selectedItems: ['Jakayla_Crooks86'],
      };
    },
    computed: {
      headers() {
        // return this.Model.nonRelationFields()
        return [
          '', 'username', 'name', 'email', 'phone', '',
        ];
      },
    },
    created() {
      // console.log(UserModel.fieldsKeys());
    },
    methods: {
      edit(item) {
        // this.setEditedItem(item)
        window.MemberForm.setEditedItem(item)
        this.editModal = true;
      },
      del(item) {

      }
    },
    async beforeMount() {
      await MemberModel.all()
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
