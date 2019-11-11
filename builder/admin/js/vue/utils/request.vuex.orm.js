import {CODE_MESSAGE, REQUEST_METHODS_TYPES} from './constant';
import models from '../store/models';

const t = function() {
  t.method = '';
  t.namespace = '';
  t.params = '';
  t.model = null;
  t.fields = '';
  t.response = {};
};

const execute = {
  input: {
    model: null,
    fields: null,
    namespace: null,
    params: null,
    method: null,
    data: null,
  },
  result: {
    model: this.input.model,
    fields: this.input.fields,
    namespace: this.input.namespace,
    reqParams: this.input.params,
    reqMethod: this.input.method,
    reqData: this.input.method,
  },
  post: async function() {
    let createdItems = await t.model.$create({data: this.input.data});
    if (!createdItems) {
      return {
        status: 404,
        message: CODE_MESSAGE[404],
      };
    }
    return {
      result: {
        ...this.result,
        data: createdItems,
      },
      status: 200,
      message: CODE_MESSAGE[200],
    };
  },
  update: async function() {
    let updatedItems = await this.model.$update({data: this.input.data});
    if (!updatedItems) {
      return {
        status: 404,
        message: CODE_MESSAGE[404],
      };
    }
    return {
      result: {
        ...result,
        data: updatedItems,
      },
      status: 200,
      message: CODE_MESSAGE[200],
    };
  },
  delete: async function() {
    let t = this;
    this.input.data.map(async item => {
      await t.model.$delete(item._id);
    });
    return {
      result: {
        ...result,
        data: [],
      },
      status: 200,
      message: CODE_MESSAGE[200],
    };
  },
};
t.prototype.request = async ({method, entity, data, params = {}}) => {
  execute.input = {
    method: method,
    namespace: entity,
    params: params,
    model: models[entity].model,
    fields: models[entity].model.fieldsKeys(),
    data: data,
  };
  await execute[method];
};

export default t;