
import {BaseModel} from './BaseModel'
import User from './UserModel'

export default class MenuModel extends BaseModel {
  static entity = 'menu';

  static fields() {
    return {
      _id: this.increment(),
      title: this.string('title'),
      group: this.string('group'),
      icon: this.string('icon'),
      href: this.string('href'),
      target: this.string('target'),
      name: this.string('name')
    };
  }
}