import { Routes } from '@angular/router'

import { RegisterComponent } from './register.component'

export const registerRoutes: Routes = [
  {
    /** Path to registerNewUser page */
    path: 'register',
    component: RegisterComponent,
  },
]
