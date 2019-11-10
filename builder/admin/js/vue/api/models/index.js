import {Database} from '@vuex-orm/core';

const files = require.context('.', false, /\.js$/);
const models = {};
files.keys().forEach(fileName => {
  if (fileName === './index.js') return;
  const modelName = fileName.replace(/(\.\/|\.js)/g, '');
  models[modelName] = files(fileName).default;
});

// const database = new Database();

// Object.keys(models).forEach(m => database.register(models[m]));

export default models;