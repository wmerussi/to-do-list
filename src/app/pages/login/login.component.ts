import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service'
import { UniqueNumberService } from '../../services/unique-number.service'

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
    private uniqueNumberService: UniqueNumberService,
  ) { }

  ngOnInit() {
    /** Get an unique number to make an unique ID for email text field */
    this.uniqueNumberService.get()
      .subscribe(number => this.emailFieldId = `text-field-${number}`)

    /** Get an unique number to make an unique ID for password text field */
    this.uniqueNumberService.get()
      .subscribe(number => this.passwordFieldId = `text-field-${number}`)
  }

  public emailSignIn() {
    this.auth.signIn(this.email, this.password).then(
      () => this.router.navigateByUrl('/'),
      error => console.log('error', error),
    )
  }

  public socialSignIn(type: string) {
    this.auth.socialSignIn(type).then(
      success => console.log('social success', success),
      error => console.log('social error', error),
    )
  }
}
