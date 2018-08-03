import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service'
import { SessionService } from '../../services/session.service'
import { UniqueNumberService } from '../../services/unique-number.service'

import { Message } from '../../../ui/models/message.model'
import { User } from '../../models/user.model'

const firebaseError = [
  'auth/wrong-password',
  'auth/invalid-email',
  'auth/user-not-found',
]

@Component({
  selector: 'page-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, SessionService, UniqueNumberService],
})
export class LoginComponent implements OnInit {
  public email: string = ''
  public password: string = ''

  public emailFieldId: string
  public passwordFieldId: string

  public message: Message

  constructor(
    private auth: AuthService,
    private router: Router,
    private session: SessionService,
    private uniqueNumber: UniqueNumberService,
  ) { }

  ngOnInit() {
    /** On Social Sign In, it will retrieve the data after the redirect,
     * so we need to intercept it here
     */
    this.auth.getSocialData().then(
      (data) => {
        if (!data.user) return
        this.setUserAndRedirect(data)
      },
      () => {
        /** Informs an unknown error */
        this.message = new Message({
          text: 'Erro desconhecido, favor entrar em contato com o suporte.',
          type: 'danger',
        })
      },
    )

    /** If user is logged in, go to Home Page */
    if (this.session.isLoggedIn()) this.router.navigateByUrl('/')

    /** Get an unique number to make an unique ID for email text field */
    this.uniqueNumber.get()
      .subscribe(number => this.emailFieldId = `text-field-${number}`)

    /** Get an unique number to make an unique ID for password text field */
    this.uniqueNumber.get()
      .subscribe(number => this.passwordFieldId = `text-field-${number}`)
  }

  public emailSignIn() {
    this.message = null

    this.auth.signIn(this.email, this.password).then(
      data => this.setUserAndRedirect(data),
      (error) => {
        /** Check if e-mail is registered or it has a valid e-mail/password */
        if (firebaseError.includes(error.code)) {
          this.message = new Message({
            text: 'E-mail e/ou senha incorreto(s).',
            type: 'danger',
          })
          return
        }

        /** Informs an unknown error */
        this.message = new Message({
          text: 'Erro desconhecido, favor entrar em contato com o suporte.',
          type: 'danger',
        })
      },
    )
  }

  public socialSignIn(type: string) {
    this.message = null

    this.auth.socialSignIn(type).then(
      () => {},
      () => this.message = new Message({
        text: 'Erro ao tentar entrar via rede social.',
        type: 'danger',
      }),
    )
  }

  private setUserAndRedirect(data) {
    /** Store User in session */
    this.session.user = new User({
      email: data.user.email,
      id: data.user.uid,
      name: data.user.displayName,
    })

    /** Go to Home Page */
    this.router.navigateByUrl('/')
  }
}
