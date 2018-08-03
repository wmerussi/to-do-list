import { Injectable } from '@angular/core'

import { User } from '../models/user.model'

const USER_SESSION = 'user-session'

@Injectable()
export class SessionService {
  /**
   * Set a user to session
   * @param { User } user
   */
  public set user(user: User) {
    this.setLocalStorage(USER_SESSION, user)
  }

  /**
   * Get logged in user
   * @returns { User }
   */
  public get user(): User {
    return this.getLocalStorage(USER_SESSION)
  }

  /** Remove user from session */
  public signOut() {
    this.removeLocalStorage(USER_SESSION)
  }

  /**
   * Checks if the user is logged in
   * @returns { boolean }
   */
  public isLoggedIn(): boolean {
    return !!this.getLocalStorage(USER_SESSION)
  }

  /**
   * Get a value from local storage
   * @param { string } session
   * @returns { any }
   */
  private getLocalStorage(session: string): any {
    return JSON.parse(localStorage.getItem(session)) || undefined
  }

  /**
   * Remove a value from local storage
   * @param { string } session
   */
  private removeLocalStorage(session: string) {
    localStorage.removeItem(session)
  }

  /**
   * Set a value on local storage
   * @param { string } session
   * @param data
   */
  private setLocalStorage(session: string, data: any) {
    localStorage.setItem(session, JSON.stringify(data))
  }
}
