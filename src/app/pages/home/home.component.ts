import { Component } from '@angular/core'

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [AuthService],
})
export class HomeComponent {
  constructor(
    private auth: AuthService,
  ) { }

  public signOut() {
    this.auth.signOut()
  }
}
