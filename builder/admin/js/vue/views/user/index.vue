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
              <icon class="btn btn-icon" name="pen" color="red"></icon>
              <icon class="btn btn-icon" name="trash"></icon>
            </div>

          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import Icon from '../../widgets/Icon';
  import json from './user.json';

  export default {
    components: {Icon},
    data() {
      return {
        users: json,
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
  };
</script>
<style scoped>
  .btn-icon{
    display: block;
    width: 48px;
    cursor: pointer;
  }
</style>
