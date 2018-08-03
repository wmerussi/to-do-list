import { Model } from '../../models/model'
import { Task } from './task.model'

export class Group extends Model {
  public title: string
  public tasks: Task[]

  constructor(obj?: any) {
    super(obj)

    this.tasks = this.tasks ? Object.entries(this.tasks).map(task => new Task({
      description: task[0],
      checked: task[1],
    })) : []
  }
}
