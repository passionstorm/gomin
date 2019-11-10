import {BaseModel} from './BaseModel'
import User from './UserModel'

export default class PostModel extends BaseModel {
  static entity = 'posts';

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