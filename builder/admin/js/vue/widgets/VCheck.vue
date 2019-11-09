<template>
  <div v-if="title" class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="v_check">
        <label>
          <icon :name="checked ? 'square_check' : 'square'"/>
          <input :disabled="isDisabled" :checked="checked" :value="value" @change="$emit('change', $event.target.checked)" class="hide" type="checkbox"/>{{ title }}
        </label>
      </div>
    </div>
  </div>
  <div v-else class="v_check">
    <label>
      <icon :name="checked ? 'square_check' : 'square'"/>
      <input :disabled="isDisabled" :checked="checked" :value="value" @change="$emit('change', $event.target.checked)" class="hide" type="checkbox"/>{{ title }}
    </label>
  </div>
</template>

<script>
  import Icon from './Icon';
  export default {
    name: 'v-check',
    components: {
      Icon,
    },
    model: {
      prop: 'checked',
      event: 'change'
    },
    props: {
      title: {
        type: String,
        default: '',
      },
      isDisabled: {
        type: Boolean,
        default: false,
      },
      'checked': Boolean,
      'value': String,
    },
    data(){
      return {
      }
    }
  };
</script>
<style scoped>
  .v_check i {
    width: 24px;
    height: 24px;
  }
  .v_check label{
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
  }
  .v_check input {
    display: none;
  }
</style>