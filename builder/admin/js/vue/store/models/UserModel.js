import {BaseModel} from './BaseModel'

const ENTITY = 'users';

export const module = {};

export default class User extends BaseModel {
  // This is the name used as module name of the Vuex Store.
  static entity = ENTITY;

  static fields() {
    return {
      _id: this.increment(),
      name: this.attr(''),
      email: this.attr(''),
    };
  }
}