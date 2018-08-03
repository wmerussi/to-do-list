import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { SessionService } from './services/session.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SessionService],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private session: SessionService) { }

  ngOnInit() {
    const route = this.session.isLoggedIn() ? '/' : '/login'
    this.router.navigateByUrl(route)
  }
}
