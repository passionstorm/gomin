<template>
  <div>
    <pin :stickyTop=0>
      <div class="d-flex bd-highlight mb-2">
        <div class="mr-auto p-2 bd-highlight">
          <a href="javascript:;" class="btn btn-d">❮ Quay lai</a>
        </div>
        <div class="p-2 bd-highlight">
          <a href="javascript:;" class="btn btn-danger" @click="modal.reset = true">Reset</a>
          <a href="javascript:;" class="btn btn-d ">Lưu</a>
          <a href="javascript:;" @click="submit" class="btn btn-primary">Đăng</a>
        </div>
      </div>
    </pin>
    <div class="row">
      <div class="col-12">
        <form action method="get">
          <text v-model="form.title" type="'text'" title="Tiêu đề*" placeholder="Tiêu đề"/>
          <text v-model="form.summary" type="textarea" title="Mô tả ngắn*"/>
          <div class="form-group">
            <label class="col-sm-3 control-label">Nội dung</label>
            <editor class="col-sm-10" ref="editor" v-model="form.body" :height="400"/>
          </div>
        </form>
      </div>
    </div>
    <modal v-model="modal.reset">
      <template slot="header">
        <h5 class="modal-title">Xác nhận</h5>
      </template>
      <template slot="body">
        <p>Bạn muốn reset nội dung đã nhập?</p>
      </template>
      <template slot="footer">
        <button type="button" class="btn btn-secondary" @click="modal.reset = false">NO</button>
        <button type="button" class="btn btn-primary" autofocus @click="reset">YES</button>
      </template>
    </modal>
    <pre>{{form}}</pre>
  </div>
</template>

<script>
  import {Text, Select, Modal, Check, Pin} from '../../widgets';
  import PostModel from '../../store/models/PostModel';

  const defaultForm = {
    status: '1',
    title: '', // 文章题目
    body: '', // 文章内容
    summary: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform'],
    comment_disabled: false,
    importance: 0,
  };

  export default {
    components: {
      Pin, Text, Pin, Select, Modal, Check,
      editor: () => import('../../widgets/Editor'),
    },
    data() {
      return {
        statusOptions: {
          0: 'draft',
          1: 'publish',
        },
        modal: {
          reset: false,
        },
        check: {
          test: false,
        },
        form: Object.assign({}, defaultForm),
      };
    },
    methods: {
      reset() {
        this.form = Object.assign({}, defaultForm);
        this.modal.reset = false;
      },
      submit() {
        PostModel.insert({data: this.form});
        this.reset();
      },
    },
    created() {

    },
    mounted() {

    },
    beforeDestroy() {
    },
  };
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
