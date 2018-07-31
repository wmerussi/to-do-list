import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'

@Injectable()
export class UniqueNumberService {
  private observable: Observable<number>
  private uniqueNumber: number = 0

  /** Generates a system unique number observable */
  constructor() {
    this.observable = Observable.create(observer => observer.next(this.uniqueNumber += 1))
  }

  /**
   * Returns an obervable of a new number
   * @return {Observable<number>} - Unique system number
   */
  public get(): Observable<number> {
    return this.observable
  }
}
