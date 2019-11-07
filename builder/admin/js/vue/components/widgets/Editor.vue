<template>
  <div class="editor">
    <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
  </div>
</template>

<script>
import icon from "./Svg";
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
export default {
  components: {
    icon,
    ckeditor: CKEditor.component
  },
  computed: {
  },
  created() {
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: '<p>Rich-text editor content.</p>',
      editorConfig: {
        // The configuration of the rich-text editor.
      }
    };
  },
  methods: {

  },
  mounted() {

  },
  beforeDestroy() {
  }
};
</script>

<style scoped>

</style>