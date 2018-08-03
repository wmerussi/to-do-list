import { Injectable } from '@angular/core'

import { AngularFireAuth } from 'angularfire2/auth'

import { DatabaseService } from '../../../app/services/database.service'

import { Task } from './task.model'

import { Observable } from 'rxjs'

@Injectable()
export class GroupsService {
  private aaa = '2tvEQkw4ozdJphS3tbkgUauH4Lg1'
  constructor(private angularFire: AngularFireAuth, private db: DatabaseService) { }

  /**
   * Get from database
   * It's possible to inform the especific list
   * @param {string} list
   * @returns {Observable<any>}
   */
  public get(list?: string): Observable<any> {
    if (!!list) {
      return this.db.get(`/${ this.aaa }/${ list }`)
    }

    return this.db.get(`/${ this.aaa }`)
  }

  public delete(groupTitle: string): Observable<any> {
    return this.db.delete(`/${ this.aaa }/${ groupTitle }`)
  }

  /**
   * Method to update a List Group
   * @param { string } groupTitle
   * @param { Task[] } tasks
   * @returns { Observable<any> }
   */
  public update(groupTitle: string, tasks: Task[]): Observable<any> {
    return this.db.put(`/${ this.aaa }/${ groupTitle }`, this.castToFirebaseObj(tasks))
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
