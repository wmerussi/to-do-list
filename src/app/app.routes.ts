import { Routes, RouterModule } from '@angular/router'

import { errorPagesRoutes } from './pages/error-pages/error-pages.routes'
import { loginRoutes } from './pages/login/login.routes'

/**
 * Single variable to import all website routes
 * It`s imported only in 'app.module.ts'
 */
const appRoutes: Routes = [
  ...loginRoutes,
  ...errorPagesRoutes, // MUST GO LAST!!!
]

export const appRoutingProviders: any[] = []
export const routing = RouterModule.forRoot(appRoutes)
