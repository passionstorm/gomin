import VuexORM, {Database} from '@vuex-orm/core';
import models from '../../api/models';

export const registerDatabase = (models, modules) => {
  const database = new Database();
  Object.keys(models).map(key => {
    database.register(models[key]);
  });
  return database;
};

export const database = registerDatabase(models);
console.log(database);
const plugin = VuexORM.install(database);
export default plugin;

