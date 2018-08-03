import { Injectable } from '@angular/core'

import { AngularFireAuth } from 'angularfire2/auth'

import { DatabaseService } from '../../../app/services/database.service'

import { Task } from './task.model'

import { Observable } from 'rxjs'

@Injectable()
export class GroupsService {
  constructor(private angularFire: AngularFireAuth, private db: DatabaseService) { }

  public get(): Observable<any> {
    return this.db.get(`/${ this.angularFire.auth.currentUser.uid }`)
  }

  public delete(groupTitle: string): Observable<any> {
    return this.db.delete(`/${ this.angularFire.auth.currentUser.uid }/${ groupTitle }`)
  }

  public new(groupTitle: string, tasks: Task[]): Observable<any> {
    return this.db.patch(`/${ this.angularFire.auth.currentUser.uid }`,
                         { [`${ groupTitle }`]: { ...tasks } })
  }

  /**
   * Method to update a List Group
   * @param {string} groupTitle
   * @param {Task[]} tasks
   * @returns {Observable<any>}
   */
  public update(groupTitle: string, tasks: Task[]): Observable<any> {
    return this.db.put(`/${ this.angularFire.auth.currentUser.uid }/${ groupTitle }`,
                       this.castToFirebaseObj(tasks))
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
