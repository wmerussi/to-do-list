import { Routes } from '@angular/router'

import { ListComponent } from './list.component'

export const listRoutes: Routes = [
  {
    /**
     * Path to list page
     * t's possible to pass a list title to edit it
     */
    path: 'list/:list',
    component: ListComponent,
  },
  {
    /** Path to list page */
    path: 'list',
    component: ListComponent,
  },
]
