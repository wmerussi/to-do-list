import { Injectable } from '@angular/core'

import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase'

@Injectable()
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth) { }

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
   * Send the user a reset e-mail
   * @param { string } email
   * @returns { Promise<any> }
   */
  public resetPassword(email: string): Promise<void> {
    return this.angularFireAuth.auth.sendPasswordResetEmail(email)
  }

  /**
   * Sign in using e-mail and password
   * @param { string } email
   * @param { string } password
   * @returns { Promise<firebase.auth.UserCredential> }
   */
  public signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    /** Stores the login on Firebase Auth Session */
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
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
}
