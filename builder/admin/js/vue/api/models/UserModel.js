import {BaseModel} from './BaseModel'

export default class User extends BaseModel {
  // This is the name used as module name of the Vuex Store.
  static entity = 'users';

  static fields() {
    return {
      _id: this.increment(),
      name: this.attr(''),
      email: this.attr(''),
    };
  }
}