import { Model } from './model'

export class User extends Model {
  public email: string
  public id: string
  public name: string

  constructor(obj?: User) {
    super(obj)
  }
}
