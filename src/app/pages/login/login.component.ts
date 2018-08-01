import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service'
import { UniqueNumberService } from '../../services/unique-number.service'

const firebaseError = [
  'auth/wrong-password',
  'auth/invalid-email',
  'auth/user-not-found',
]

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, UniqueNumberService],
})
export class LoginComponent implements OnInit {
  public email: string = ''
  public password: string = ''

  public emailFieldId: string
  public passwordFieldId: string

  constructor(
    private auth: AuthService,
    private router: Router,
    private uniqueNumber: UniqueNumberService,
  ) { }

  ngOnInit() {
    /** Get an unique number to make an unique ID for email text field */
    this.uniqueNumber.get()
      .subscribe(number => this.emailFieldId = `text-field-${number}`)

    /** Get an unique number to make an unique ID for password text field */
    this.uniqueNumber.get()
      .subscribe(number => this.passwordFieldId = `text-field-${number}`)
  }

  public emailSignIn() {
    this.auth.signIn(this.email, this.password).then(
      () => { }, // app.component will listen and redirect to home page
      (error) => {
        /** Check if e-mail is registered or it has a valid e-mail/password */
        if (firebaseError.includes(error.code)) {
          console.log('invalid e-mail or password')
          return
        }

        /** Informs an unknown error */
        console.log('unknown error')
      },
    )
  }

  public socialSignIn(type: string) {
    this.auth.socialSignIn(type).then(
      success => console.log('social success', success),
      error => console.log('social error', error),
    )
  }
}
