import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service'
import { UniqueNumberService } from '../../services/unique-number.service'

import { Message } from '../../../ui/models/message.model'

const firebaseError = {
  emailInUse: 'auth/email-already-in-use',
  invalidEmail: 'auth/invalid-email',
  weakPassword: 'auth/weak-password',
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService, UniqueNumberService],
})
export class RegisterComponent implements OnInit {
  public email: string = ''
  public password: string = ''

  public emailFieldId: string
  public passwordFieldId: string

  public message: Message

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

  public registerNewUser() {
    this.message = null

    this.auth.register(this.email, this.password).then(
      () => { }, // app.component will listen and redirect to home page
      (error)  => {
        switch (error.code) {
          case firebaseError.emailInUse:
            this.message = new Message({
              text: 'E-mail já cadastrado.',
              type: 'warning',
            })
            break

          case firebaseError.invalidEmail:
            this.message = new Message({
              text: 'E-mail inválido.',
              type: 'danger',
            })
            break

          case firebaseError.weakPassword:
            this.message = new Message({
              text: 'Senha fraca. Utilizar ao menos 6 caracteres.',
              type: 'warning',
            })
            break

          default:
            this.message = new Message({
              text: 'Erro desconhecido, favor entrar em contato com o suporte.',
              type: 'danger',
            })
        }
      },
    )
  }
}
