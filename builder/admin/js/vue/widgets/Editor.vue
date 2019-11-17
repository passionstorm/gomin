<template>
  <div class="editor">
    <ckeditor @input="$emit('input', editorData)"
              :editor="editor"
              v-model="editorData"
              :config="editorConfig"
    />
  </div>
</template>

<script>
  import Icon from './Icon';
  import CKEditor from '@ckeditor/ckeditor5-vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  export default {
    name: 'editor',
    components: {
      Icon,
      ckeditor: CKEditor.component,
    },
    props:{

    },
    computed: {},
    created() {
    },
    data() {
      return {
        editor: ClassicEditor,
        editorData: '',
        editorConfig: {
          toolbarLocation: 'bottom',

          // toolbar: {
          //   items: [
          //     'undo',
          //     'redo',
          //
          //     'bold',
          //     'italic',
          //     'link',
          //   ],
          // },
        },
      };
    },
    methods: {},
    mounted() {

    },

    beforeDestroy() {
    },
  };
</script>

<style scoped>
  .ck-content p{
    margin-bottom: 0 !important;
    margin-top: 0 !important;
  }
</style>