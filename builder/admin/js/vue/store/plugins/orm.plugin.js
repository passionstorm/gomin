import VuexORM, {Database} from '@vuex-orm/core';
import models from '../../store/models';
import localForagePlugin from 'vuex-orm-localforage';

export const registerDatabase = (models) => {
  const db = new Database();
  Object.keys(models).map(modelName => {
    const {model, module} = models[modelName];
    db.register(model, module);
  });

  return db;
};
const database = registerDatabase(models);
VuexORM.use(localForagePlugin, {database});

const plugin = VuexORM.install(database);
export default plugin;

