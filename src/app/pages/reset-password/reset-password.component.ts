import { Component, OnInit } from '@angular/core'

import { AuthService } from '../../services/auth.service'
import { UniqueNumberService } from '../../services/unique-number.service'

import { Message } from '../../../ui/models/message.model'

const firebaseError = {
  invalidEmail: 'auth/invalid-email',
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  providers: [AuthService, UniqueNumberService],
})
export class ResetPasswordComponent implements OnInit {
  public email: string = ''
  public emailFieldId: string
  public message: Message

  constructor(private auth: AuthService, private uniqueNumber: UniqueNumberService) { }

  ngOnInit() {
    /** Get an unique number to make an unique ID for email text field */
    this.uniqueNumber.get()
      .subscribe(number => this.emailFieldId = `text-field-${number}`)
  }

  public resetPassword() {
    this.message = null

    this.auth.resetPassword(this.email).then(
      () => this.message = new Message({
        text: 'O link para resetar sua senha foi enviado para seu e-mail!',
        type: 'success',
      }),
      (error) => {
        switch (error.code) {
          case firebaseError.invalidEmail:
            this.message = new Message({
              text: 'E-mail inválido.',
              type: 'danger',
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
