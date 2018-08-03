import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { firebaseConfig } from '../environments/firebase.config'

import { Observable } from 'rxjs'

@Injectable()
export class DatabaseService {
  private url = `https://{projectId}.firebaseio.com/{db}.json`
  constructor(private http: HttpClient) { }

  public delete(db: string) {
    return this.http.delete(this.buildUrl(db))
  }

  public get(db: string): Observable<any> {
    return this.http.get(this.buildUrl(db))
  }

  public patch(db: string, data: Object) {
    return this.http.patch(this.buildUrl(db), data)
  }

  public put(db: string, data: Object) {
    return this.http.put(this.buildUrl(db), data)
  }

  private buildUrl(db: string): string {
    return this.url
      .replace('{projectId}', firebaseConfig.projectId)
      .replace('{db}', db)
  }
}
