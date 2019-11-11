import {CODE_MESSAGE, REQUEST_METHODS_TYPES} from './constant';
import models from '../api/models';

const t = function() {
  t.method = '';
  t.namespace = '';
  t.params = '';
  t.model = null;
  t.fields = '';
  t.response = {};
};

t.init = (url) => {
  let [method = 'get', path] = url.split(' ');
  t.method = method.toLowerCase();
  t.namespace = path.replace('/', '');
  t.params = path.split('/')[1];
  t.model = models[t.namespace];
  t.fields = t.model.fieldsKeys();
};

t.prototype.request = async (url, data) => {
  t.init(url);
  let result = {
    model: t.model,
    fields: t.fields,
    namespace: t.namespace,
    reqParams: t.params,
    reqMethod: t.method,
    reqData: data,
  };

  if (REQUEST_METHODS_TYPES.mutation.includes(t.method)) {
    console.log('Mutating ...');
    if (t.method === 'post') {
      if (t.params === 'delete') {
        data.map(async item => {
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
      } else {
        let createdItems = await t.model.$create({data});
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
    } else if (t.method === 'update') {
      let updatedItems = await t.model.$update({data});
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
    } else if (t.method === 'delete') {
      let deletedItems = await t.model.$delete(data._id);
      return {
        result: {
          ...result,
          data: deletedItems,
        },
        status: 200,
      };
    }
  }
  if (REQUEST_METHODS_TYPES.query.includes(t.method)) {
    console.log('Quering ...');
    if (data) {
      let foundItems = await t.model.$get(data._id);
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
      let allItems = await t.model.$fetch();
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