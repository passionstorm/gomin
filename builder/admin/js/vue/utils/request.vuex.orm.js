import {CODE_MESSAGE, REQUEST_METHODS_TYPES} from './constant';
import models from '../api/models';

const t = function() {
  this.method = '';
  this.namespace = '';
  this.params = '';
  this.model = null;
  this.fields = '';
  this.response = {};
};

t.prototype.init = (url) => {
  let [method = 'get', path] = url.split(' ');
  this.method = method.toLowerCase();
  this.namespace = path.replace('/', '');
  this.params = path.split('/')[1];
  this.model = models[this.namespace];
  this.fields = this.model.fieldsKeys();
};

t.prototype.request = async (url, data) => {
  this.init(url);
  let result = {
    model: this.model,
    fields: this.fields,
    namespace: this.namespace,
    reqParams: this.params,
    reqMethod: this.method,
    reqData: data,
  };

  if (REQUEST_METHODS_TYPES.mutation.includes(this.method)) {
    console.log('Mutating ...');
    if (this.method === 'post') {
      if (this.params === 'delete') {
        data.map(async item => {
          await this.model.$delete(item._id);
        });
        return {
          result: {
            ...result,
            data: [],
          },
          status: 200,
          message: CODE_MESSAGE[200],
        };
      } else {
        let createdItems = await this.model.$create({data});
        if (!createdItems) {
          return {
            status: 404,
            message: CODE_MESSAGE[404],
          };
        }
        return {
          result: {
            ...result,
            data: createdItems,
          },
          status: 200,
          message: CODE_MESSAGE[200],
        };
      }
    } else if (this.method === 'update') {
      let updatedItems = await this.model.$update({data});
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
    } else if (this.method === 'delete') {
      let deletedItems = await this.model.$delete(data._id);
      return {
        result: {
          ...result,
          data: deletedItems,
        },
        status: 200,
      };
    }
  }
  if (REQUEST_METHODS_TYPES.query.includes(this.method)) {
    console.log('Quering ...');
    if (data) {
      let foundItems = await this.model.$get(data._id);
      if (!foundItems) {
        return {
          status: 404,
          message: CODE_MESSAGE[404],
        };
      }
      return {
        result: {
          ...result,
          data: foundItems,
        },
        status: 200,
        message: CODE_MESSAGE[200],
      };
    } else {
      // Sync localforage with vuex store
      let allItems = await this.model.$fetch();
      if (!allItems) {
        return {
          status: 404,
          message: CODE_MESSAGE[404],
        };
      }
      return {
        result: {
          ...result,
          data: allItems,
        },
        status: 200,
        message: CODE_MESSAGE[200],
      };
    }
  }
};

export default t;