<template>
  <div>
    <div class="d-flex mb-2">
      <div class="mr-auto"></div>
      <div>
        <a v-show="checkedRows.length" @click="del" class="btn btn-danger" href="javascript:;">Xoá</a>
        <router-link to="edit" class="btn btn-d">Thêm thành viên</router-link>
      </div>
    </div>
    <div class="card">
      <div class="card-body">
        <v-table
            class="table table-striped"
            :data="data"
            :columns="columns"
            :checked-rows.sync="checkedRows"
            :selected.sync="selected"
            checkable
        >
          <template slot="bottom-left">
            <b>Total checked</b>: {{ checkedRows.length }}
          </template>
        </v-table>
      </div>
    </div>
  </div>
</template>

<script>
  import {Modal, Icon, Pin, Check, Radio, VTable} from '../../widgets';
  import {ENTITY, default as MemberModel} from '../../store/models/MemberModel';

  export default {
    components: {Modal, Icon, Check, Radio, VTable},
    data() {
      return {
        data: [],
        selected: {},
        columns: [
          {
            field: 'username',
            label: 'Username',
          },
          {
            field: 'name',
            label: 'Name',
          },
          {
            field: 'email',
            label: 'Email',
            centered: true
          },
          {
            field: 'phone',
            label: 'phone',
          }
        ],
        checkedRows: [],
        entity: ENTITY,
        editModal: false,
      };
    },
    computed: {},
    created() {
    },
    methods: {
      edit(item) {
        // this.setEditedItem(item)
        window.MemberForm.setEditedItem(item)
        this.editModal = true;
      },
      del() {
        let ids = this.checkedRows.map(e => e._id);
        ids.forEach(id => MemberModel.$delete(id))
        this.data = MemberModel.query().all()
      }
    },
    async beforeMount() {
      await MemberModel.$fetch()
      this.data = MemberModel.query().all()
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
