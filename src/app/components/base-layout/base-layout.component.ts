import { Component } from '@angular/core'

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
  providers: [AuthService],
  inputs: ['button'],
})
export class BaseLayoutComponent {
  /** Inputs */
  public button: string

  constructor(private auth: AuthService) { }

  public showButton(type: string): boolean {
    return type === this.button
  }

  public signOut() {
    this.auth.signOut()
  }
}
