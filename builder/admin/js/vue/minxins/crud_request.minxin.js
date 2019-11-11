import Request from '../utils/request.vuex.orm';
import {rules} from '../utils/validate';
import {baseFilter} from '../utils';
import {HTTP_METHOD} from '../utils/constant';
const req = new Request();

const t = {
  data() {
    return {
      entity: '',
      editedItem: {}, // currently item to be edited
      editedIndex: -1, // when -1, create, else update or delete
      model: null,
      fields: [],
      defaultItem: {},
      filter: {
        search: '',
        sort: '_id',
      },
      rules,
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Thêm' : 'Sửa';
    },
    editing() {
      return this.editedIndex !== -1; // is in edit state
    },
    items() {
      let {filter: {search, sort}} = this;
      let data = this.model ? this.model.query().all() : [];
      if (search === '') return data;
      return baseFilter({sort, search}, data);
    },
    headers() {
      // if (this.fields) return genTableHeaders(this.fields)
      return [];
    },
    count() {
      return this.items ? this.items.length : 0;
    },
  },

  watch: {
    async entity(val) {
      await this.fetch();
    },
    editedIndex(val) {
      console.log(`Editing item ${val}`);
    },
  },

  async beforeMount() {
    await this.fetch();
  },

  created() {
    this.$on('SET_EDITING', function(item) {
      this.setEditedItem(item);
    });
  },

  methods: {
    async fetch() {
      const { result: {fields, model}, } = await req.request({
        method: HTTP_METHOD.GET,
        entity: this.entity,
        params: {},
      });
      this.fields = fields;
      this.model = model;
      this.setEditedItem(new this.model());
    },
    async deleteItem(data) {
      await req.request({
        method: HTTP_METHOD.DELETE,
        entity: this.entity,
        data: data,
      });
    },
    // async deleteAll(data) {
    //   await req.request(`post /${this.modelName}/delete`, data);
    // },
    async updateItem(data) {
      await req.request({
        method: HTTP_METHOD.PUT,
        entity: this.entity,
        data: data
      })
    },
    async createItem(data) {
      console.log('Creating');
      await req.request({
        method: HTTP_METHOD.POST,
        entity: this.entity,
        data: data
      })
    },
    async saveItem(data) {
      this.setEditedItem(data);
      if (this.editedIndex > -1) {
        await this.updateItem(this.editedItem);
      } else {
        await this.createItem(this.editedItem);
      }
    },
    setEditedItem(data) {
      this.editedIndex = data._id ? data._id : -1;
      this.editedItem = Object.assign({}, data);
    },
    reset() {
      this.setEditedItem(new this.model());
    },
  },
};

export default t;