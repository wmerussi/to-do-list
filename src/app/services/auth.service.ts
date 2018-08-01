import { Injectable } from '@angular/core'

import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase'

import { BehaviorSubject, Observable } from 'rxjs'

@Injectable()
export class AuthService {
  private authStateBs: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(private angularFireAuth: AngularFireAuth) {
    this.checkUserState()
  }

  /**
   * Method to listen if the user is logged in
   * @returns { Observable<boolean> }
   */
  public authState(): Observable<boolean> {
    return this.authStateBs.asObservable()
  }

  /**
   * Register a new user
   * @param { string } email
   * @param { string } password
   * @returns { Promise<firebase.auth.UserCredential> }
   */
  public register(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  /**
   * Sign in using e-mail and password
   * @param { string } email
   * @param { string } password
   * @returns { Promise<firebase.auth.UserCredential> }
   */
  public signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    /** Stores the login on Firebase Auth Session */
    return this.angularFireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(
      () => this.angularFireAuth.auth.signInWithEmailAndPassword(email, password),
    )
  }

  /**
   * Sign out
   * @returns { Promise<void> }
   */
  public signOut(): Promise<void> {
    return this.angularFireAuth.auth.signOut()
  }

  /**
   * Sign in using a social network
   * @param { providerType } type
   * @returns { Promise<void> }
   */
  public socialSignIn(type: string): Promise<void> {
    let provider

    switch (type) {
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider()
        break

      case 'google':
        provider = new firebase.auth.GoogleAuthProvider()
        break

      default:
        return Promise.reject('Unknown social type')
    }

    return this.angularFireAuth.auth.signInWithRedirect(provider)
  }

  /**
   * Get user's data from social network
   * @returns { Promise<firebase.auth.UserCredential> }
   */
  public getSocialData(): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.auth.getRedirectResult()
  }

  /** Subscribes to firebase user state and inform 'authStateBs' if it's logged in */
  private checkUserState() {
    this.angularFireAuth.auth.onAuthStateChanged(user => this.authStateBs.next(!!user))
  }
}
