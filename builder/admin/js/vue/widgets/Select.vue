<template>
  <div v-if="title" class="form-group">
    <label :for="id" class="col-sm-6 control-label">{{ title }}</label>
    <div class="col-sm-10">
      <select :value="value" @input="$emit('input', $event.target.value)"  class="form-control" :disabled="isDisabled" :multiple="isMultiple">
        <option v-for="(item,index) in list" :data="item" :key="index">
          {{ item }}
        </option>
      </select>
    </div>
  </div>
  <select :value="value" @input="$emit('input', $event.target.value)" v-else :disabled="isDisabled" :multiple="isMultiple">
    <option v-for="(item,index) in list" :data="item" :key="index" :value="index">
      {{ item }}
    </option>
  </select>
</template>
<script>
  export default {
    props: {
      list: {
        type: Object,
        default: {},
      },
      isDisabled: {
        type: Boolean,
        default: false,
      },
      isMultiple: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
      },
      id: {
        type: String,
      },
      value: {
        type: String,
      },
    },
    created() {
    },
  };
</script>
<style scoped>

</style>