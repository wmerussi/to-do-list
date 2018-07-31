import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

/** Routing */
import { appRoutingProviders, routing } from './app.routes'

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
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
