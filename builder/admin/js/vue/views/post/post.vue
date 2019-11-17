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
    <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit">
      <field class="col-sm-8" label="Tiêu đề" required="required">
        <v-input rules="required" maxlength="30" v-model="form.title" type="'text'" title="Tiêu đề*" placeholder="Tiêu đề"/>
      </field>
      <field label="Danh muc">
        <taginput :data="categories" autocomplete v-model="editedItem.categories" icon="label"
                  placeholder="Add a tag"
        ></taginput>
      </field>
      <field class="col-sm-8" label="Mô tả ngắn" required="required">
        <v-input v-model="form.summary" type="textarea" rules="required" maxlength="100"/>
      </field>
      <field class="col-sm-8" label="Nội dung">
        <editor ref="editor" v-model="form.body" :height="400"/>
      </field>

    </ValidationObserver>
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
  import {Check, Field, Modal, Pin, Taginput, VInput, VSelect} from '../../widgets';
  import PostModel from '../../store/models/PostModel';
  import {ValidationObserver} from 'vee-validate';

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
      VInput, Field,
      Pin, VSelect, Modal, Check, ValidationObserver, Taginput,
      editor: () => import('../../widgets/Editor'),
    },
    data() {
      return {
        editedItem: {},
        categories: ['draft', 'publish'],
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
