import { Routes, RouterModule } from '@angular/router'

import { errorPagesRoutes } from './pages/error-pages/error-pages.routes'
import { homeRoutes } from './pages/home/home.routes'
import { loginRoutes } from './pages/login/login.routes'
import { registerRoutes } from './pages/register/register.routes'

/**
 * Single variable to import all website routes
 * It`s imported only in './app.module.ts'
 */
const appRoutes: Routes = [
  ...homeRoutes,
  ...loginRoutes,
  ...registerRoutes,
  ...errorPagesRoutes, // MUST GO LAST!!!
]

export const appRoutingProviders: any[] = []
export const routing = RouterModule.forRoot(appRoutes)
