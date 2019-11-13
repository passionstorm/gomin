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
      <input style="display: block" v-model="selected" :value="val" class="" @change="onChange($event.target.checked)" type="checkbox"/>{{ title }}
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
      value:{

      },
      checked: Boolean|Array,
      val: Array|String,
      type: {
        type: String,
        default: 'checkbox',
      }
    },

    computed:{
      selected:{
        get () {
          return this.value
        },
        set (val) {
          this.mVal = val
        }
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
        this.mChecked = checked
        this.$emit('input', this.mVal)
      }
    },
   created() {
     console.log(this.value, this.val)
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