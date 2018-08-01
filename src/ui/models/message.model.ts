import { Model } from '../../app/models/model'

export class Message extends Model {
  public text: string
  public type: string

  constructor(obj?: Message) {
    super(obj)
  }
}
