import { Injectable } from '@angular/core'

import { DatabaseService } from '../../../app/services/database.service'
import { UserService } from '../../../app/services/user.service'

import { Task } from './task.model'

import { Observable } from 'rxjs'

@Injectable()
export class GroupsService {
  constructor(private db: DatabaseService, private user: UserService) { }

  public get(): Observable<any> {
    return this.db.get(`/${ this.user.id }`)
  }

  public delete(groupTitle: string): Observable<any> {
    return this.db.delete(`/${ this.user.id }/${ groupTitle }`)
  }

  public new(groupTitle: string, tasks: Task[]): Observable<any> {
    return this.db.patch(`/${ this.user.id }`, { [`${ groupTitle }`]: { ...tasks } })
  }

  /**
   * Method to update a List Group
   * @param {string} groupTitle
   * @param {Task[]} tasks
   * @returns {Observable<any>}
   */
  public update(groupTitle: string, tasks: Task[]): Observable<any> {
    return this.db.put(`/${ this.user.id }/${ groupTitle }`, this.castToFirebaseObj(tasks))
  }

  /**
   * Method to transform a Task[] Object to Firebase[] Object
   * @param { Task[] } tasks
   * @returns { Object }
   */
  private castToFirebaseObj(tasks: Task[]): Object {
    const castFirebase = tasks.map(t => new Object({ [`${ t.description }`]: t.checked }))
    return castFirebase.reduce((o, n) => Object.assign(o, n) , {})
  }
}
