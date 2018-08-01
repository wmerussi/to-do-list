import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from './services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
    /** Listen to Auth State and go to the proper page when logged in or out */
    this.auth.authState().subscribe((userIsLoggedIn) => {
      if (userIsLoggedIn) {
        this.route.navigateByUrl('/')
        return
      }

      this.route.navigateByUrl('/login')
    })
  }
}
