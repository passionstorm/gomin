<template>
  <div>
    <div class="row">
      <div class="col-7">
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
                    <icon class="btn btn-icon" name="pen" color="red" ></icon>
                  </button>

                  <icon class="btn btn-icon" name="trash"></icon>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col">
        <user-form :data="selected"/>
      </div>
    </div>

  </div>
</template>

<script>
  import Icon from '../../widgets/Icon';
  import json from './user.json';
  import UserForm from './UserForm';
  export default {
    components: {Icon,UserForm},
    data() {
      return {
        users: json,
        itemSelected: {}
      };
    },
    computed: {
      headers() {
        // return this.Model.nonRelationFields()
        return [
          'username', 'name', 'email', 'phone', '',
        ];
      },
      selected(){
        return this.itemSelected
      }
    },
    methods:{
      edit(item){
        this.itemSelected = item;
      }
    },
    watch:{
      itemSelected(val){
        console.log(val);
      }
    }
  };
</script>
<style scoped>
  .btn-icon{
    display: block;
    width: 48px;
    cursor: pointer;
  }
</style>
