<template>
    <div v-if="title" class="form-group" >
        <template v-if="type === 'textarea'">
            <label :for="id" class="col-sm-6 control-label">{{ title }}</label>
            <div class="col-sm-10">
                <textarea
                       :class="[formControl, getSize]"
                       :id="id"
                       :placeholder="placeholder"
                       @input="$emit('input', $event.target.value)"
                       :value="value"></textarea>
            </div>
        </template>
        <template v-else="type = 'textarea'">
            <label :for="id" class="col-sm-6 control-label">{{ title }}</label>
            <div class="col-sm-10">
                <input type="text"
                       :class="[formControl, getSize]"
                       :id="id"
                       :placeholder="placeholder"
                       @input="$emit('input', $event.target.value)"
                       :value="value"/>
            </div>
        </template>
    </div>
    <div v-else>
       <textarea v-if="type === 'textarea'"
           :class="[formControl, getSize]"
           :id="id"
           :placeholder="placeholder"
           @input="$emit('input', $event.target.value)"
           :value="value"></textarea>

        <input v-else
            type="text"
            :class="[formControl, getSize]"
            :id="id"
            :placeholder="placeholder"
            :value="value"
            @input="$emit('input', $event.target.value)"
            :disabled="isDisabled"
        />
    </div>

</template>

<script>
  export default {
    name: 'v-text',
    props: {
      type: {
        type: String,
        default: 'text'
      },
      id: {
        type: String
      },
      placeholder: {
        type: String,
        default: 'Enter Text...'
      },
      size: {
        type: String
      },
      value: {
        type: String
      },
      isFormControl: {
        type: Boolean,
        default: true
      },

      title: {
        type: String
      },
      isDisabled: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      getSize () {
        if (!this.size) {
          return ''
        }
        return 'input-' + this.size
      },
      formControl () {
        return this.isFormControl ? 'form-control' : ''
      }
    },
    created () {
    }
  }
</script>