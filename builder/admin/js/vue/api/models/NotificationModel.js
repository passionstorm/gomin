import { BaseModel } from './BaseModel'

export default class NotificationModel extends BaseModel {
  static entity = 'notification';

  static fields() {
    return {
      _id: this.increment(),
      title: this.string('New message from Michael'),
      color: this.string('light-green'),
      icon: this.string('account_circle'),
      timeLabel: this.string('2 min ago')
    }
  }
}