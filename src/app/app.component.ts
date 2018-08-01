import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from './services/auth.service'

import { ErrorComponent } from './pages/error-pages/error/error.component'
import { ForbiddenComponent } from './pages/error-pages/forbidden/forbidden.component'
import { NotFoundComponent } from './pages/error-pages/not-found/not-found.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthService],
})
export class AppComponent implements OnInit {
  private userIsLoggedIn: boolean

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
    /** Listen to Auth State an assign it to 'userIsLoggedIn' */
    this.auth.authState().subscribe((state) => {
      this.userIsLoggedIn = state
      this.checkStateAndRedirect(state)
    })
  }

  public onRoute(event: any) {
    if (this.userIsLoggedIn
        || event instanceof ErrorComponent
        || event instanceof ForbiddenComponent
        || event instanceof NotFoundComponent) return

    /** If user is not logged in and requested page is a page, go to login page */
    this.goToLoginPage()
  }

  private checkStateAndRedirect(state: boolean) {
    if (state) return

    /** If user logged out, go to login page */
    this.goToLoginPage()
  }

  private goToLoginPage() {
    this.route.navigateByUrl('/login')
  }
}
