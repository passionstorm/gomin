<template>
  <div>
    <ValidationObserver ref="form" tag="form" @submit.prevent="onSubmit" v-slot="{invalid}">
      <div class="d-flex bd-highlight mb-2">
        <div class="mr-auto p-2 bd-highlight">
          <a href="javascript:;" class="btn btn-d">❮ Quay lai</a>
        </div>
        <div class="p-2 bd-highlight">
          <a href="javascript:;" class="btn btn-danger" @click="modal.reset = true">Reset</a>
          <a href="javascript:;" class="btn btn-d ">Lưu</a>
          <a :disabled="invalid" href="javascript:;" @click="onSubmit" class="btn btn-primary">Đăng</a>
        </div>
      </div>

      <collapse aria-id="colaps.post" class="card card-primary" :open.sync="colaps.post.open">
        <div role="button" class="card-header" slot="trigger" aria-controls="colaps.post" slot-scope="props">
          <div class="card-header-title">
            Bài viết
          </div>
          <a class="card-header-icon">
            <icon
                :name="props.open ? 'arrow_down' : 'arrow_right'">
            </icon>
          </a>
        </div>
        <div class="card-body">
          <field class="col-sm-10" label="Tiêu đề" required="required">
            <v-input vid="title" rules="required" maxlength="30" v-model="form.title" type="'text'" title="Tiêu đề*"
                     placeholder="Tiêu đề"/>
          </field>
          <field label="Danh muc" class="col-sm-10">
            <taginput :data="filterCategory" autocomplete v-model="form.categories" icon="label"
                      placeholder="Add a tag" field="name" @typing="getFilteredTags"
            ></taginput>
          </field>

          <field class="col-sm-10" label="Nội dung">
            <editor ref="editor" v-model="form.body" :height="400"/>
          </field>
        </div>
      </collapse>
      <collapse aria-id="colaps.seo" class="card card-primary" :open.sync="colaps.seo.open">
        <div slot="trigger" class="card-header" role="button" slot-scope="props" aria-controls="colaps.seo">
          <div class="card-header-title">
            Seo
          </div>
          <a class="card-header-icon">
            <icon :name="props.open ? 'arrow_down' : 'arrow_right'"/>
          </a>
        </div>
        <div class="card-body">
          <field class="col-sm-10" label="Tiêu đề">
            <v-input v-model="form.seo.title" type="textarea" maxlength="60"/>
          </field>
          <field class="col-sm-10" label="Mô tả ngắn">
            <v-input v-model="form.seo.description" type="textarea" maxlength="100"/>
          </field>
          <field label="Từ khoá tìm kiếm" class="col-sm-10">
            <taginput v-model="form.seo.tags" icon="label"
                      placeholder="Nhập từ khoá"
            ></taginput>
          </field>
        </div>
      </collapse>
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
  </div>
</template>

<script>
  import {Check, Field, Modal, Pin, Taginput, VInput, VSelect, Collapse, Icon} from '../../widgets';
  import PostModel from '../../store/models/PostModel';
  import {ValidationObserver} from 'vee-validate';

  const defaultForm = {
    status: '1',
    seo: {},
    title: '', // 文章题目
    body: '', // 文章内容
    summary: '', // 文章摘要
    source_uri: '', // 文章外链
    image_uri: '', // 文章图片
    categories: [],
    display_time: undefined, // 前台展示时间
    id: undefined,
    platforms: ['a-platform'],
    comment_disabled: false,
    importance: 0,
  };

  export default {
    components: {
      VInput, Field, Pin, VSelect, Modal, Check, ValidationObserver, Taginput, Collapse, Icon,
      editor: () => import('../../widgets/Editor'),
    },
    data() {
      return {
        tags: [],
        colaps: {
          post: {open: true,},
          seo: {open: true,},
        },
        editedItem: {},
        categories: [
          {
            id: 0,
            name: 'ban hang',
          }, {id: 1, name: 'duoc'}, {id: 3, name: 'nha cua'}],
        filterCategory: this.categories,
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
      getFilteredTags(text) {
        this.filterCategory = this.categories.filter((i) => {
          return i.name.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0;
        });
      },
      reset() {
        this.form = Object.assign({}, defaultForm);
        this.modal.reset = false;
      },
      onSubmit() {
        this.$refs.form.validate();
        // PostModel.insert({data: this.form});
        // this.reset();
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
