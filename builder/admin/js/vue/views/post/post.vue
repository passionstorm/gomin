<template>
  <div>
    <form action method="get">
      <input placeholder="Tiêu đề" type="text" />
      <Editor></Editor>
    </form>
  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
    };
  },
  created() {
    this.$emit('slot-footer', () => import( '@/views/post/post_footer'));
    
  },
  mounted() {
    
  },
  beforeDestroy() {
  }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
form .card {
  margin: 4px 0;
}
input {
  padding: 0.5rem 0.75rem;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.2;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  box-shadow: inset 0 0 0 transparent;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
</style>>
