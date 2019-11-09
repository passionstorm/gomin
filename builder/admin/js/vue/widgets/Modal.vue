<template>
  <div class="modal" v-show="value">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="header">
            default header
          </slot>
          <button v-show="isIconClose" type="button" class="close" @click="$emit('input', false)">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body">
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: false,
      },
      isIconClose: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
<style scoped>
  .modal {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

</style>