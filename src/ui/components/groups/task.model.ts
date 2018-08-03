import { Model } from '../../models/model'

export class Task extends Model {
  public checked: boolean
  public description: string

  constructor(obj?: any) {
    super(obj)
  }
}
