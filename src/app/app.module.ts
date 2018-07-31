import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

/** Routing */
import { appRoutingProviders, routing } from './app.routes'

/** Modules */
import { UiModule } from '../ui/ui.module'

/** Components */
import { AppComponent } from './app.component'
import { ErrorPagesModule } from './pages/error-pages/error-pages.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ErrorPagesModule,
    routing,
    UiModule,
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
