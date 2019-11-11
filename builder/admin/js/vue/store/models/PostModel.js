import {make} from 'vuex-pathify';
import {BaseModel} from './BaseModel';
import User from './UserModel';

const ENTITY = 'posts';

const state = {
  name: ENTITY,
  items: [],
  defaultArticle: {},
};
export const module = {
  namespaced: true,
  state,
  mutations: {
    ...make.mutations(state),
  },
  actions: {
    ...make.actions(state),
  },
  getters: {
    ...make.getters(state),
  },
};

export default class PostModel extends BaseModel {
  static entity = ENTITY;
  static fields() {
    return {
      _id: this.increment(),
      title: this.string(''),
      summary: this.string(''),
      body: this.string(''),
      status: this.number(0),
      author: this.belongsTo(User, 'user_id'),
      published: this.attr(''),
    };
  }
}
