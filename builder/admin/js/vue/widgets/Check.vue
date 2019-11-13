<template>
  <div v-if="title" class="form-group">
    <div class="col-sm-offset-2 col-sm-10">
      <div class="v_check">
        <label>
          <icon :name="mChecked ? 'square_check' : 'square'"/>
          <input :name="name"  :disabled="isDisabled" :checked="mChecked" :value="value" @change="onChange($event.target.checked)" class="hide" type="checkbox"/>{{ title }}
        </label>
      </div>
    </div>
  </div>
  <div v-else class="v_check">
    <label>
      <icon :name="mChecked ? 'square_check' : 'square'"/>
      <input :name="name" :disabled="isDisabled" :checked="mChecked" :value="value"  @change="onChange($event.target.checked)" class="hide" type="checkbox"/>{{ title }}
    </label>
  </div>
</template>

<script>
  import Icon from './Icon';
  export default {
    name: 'v-radio',
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
      name: {
        type: String,
        default: '',
      },
      label: {
        type: String,
      },
      isDisabled: {
        type: Boolean,
        default: false,
      },
      'checked': Boolean,
      'value': String,
      type: {
        type: String,
        default: 'checkbox',
      }
    },
    data(){
      return {
        mChecked: this.checked,
        mVal: this.value,
      }
    },
    methods:{
      onChange(checked){
        console.log("changed");
        this.mChecked = checked;
        this.$emit('change', checked)
      }
    },
    watch:{
      '$event.target': function(val) {
        console.log(val)
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