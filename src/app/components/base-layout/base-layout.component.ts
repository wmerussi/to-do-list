import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service'
import { SessionService } from '../../services/session.service'

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  providers: [AuthService, SessionService],
  inputs: ['button'],
})
export class BaseLayoutComponent implements OnInit {
  /** Inputs */
  public button: string

  constructor(
    private auth: AuthService,
    private router: Router,
    private session: SessionService,
  ) { }

  ngOnInit() {
    if (!this.session.isLoggedIn()) this.router.navigateByUrl('/login')
  }

  public signOut() {
    this.session.signOut()
    this.auth.signOut().then(() => this.router.navigateByUrl('/login'))
  }
}
