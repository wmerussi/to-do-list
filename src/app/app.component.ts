import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AngularFireAuth } from 'angularfire2/auth'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private angularFire: AngularFireAuth, private route: Router) { }

  ngOnInit() {
    /** Listen to Auth State and go to the proper page when logged in or out */
    this.angularFire.auth.onAuthStateChanged(() => {
      const user = this.angularFire.auth.currentUser
      const rootPage = !!user ? '/' : '/login'

      this.route.navigateByUrl(rootPage)
    })
  }
}
