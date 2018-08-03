import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'

/** Packages */
import { AngularFireAuthModule } from 'angularfire2/auth'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2'

/** Routing */
import { appRoutingProviders, routing } from './app.routes'

/** Services */
import { DatabaseService } from './services/database.service'

/** Modules */
import { ErrorPagesModule } from './pages/error-pages/error-pages.module'
import { UiModule } from '../ui/ui.module'

/** Components */
import { AppComponent } from './app.component'
import { BaseLayoutComponent } from './components/base-layout/base-layout.component'

/** Pages */
import { HomeComponent } from './pages/home/home.component'
import { ListComponent } from './pages/list/list.component'
import { LoginComponent } from './pages/login/login.component'
import { RegisterComponent } from './pages/register/register.component'
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component'

/** Variables */
import { firebaseConfig } from './environments/firebase.config'

@NgModule({
  declarations: [
    AppComponent,
    BaseLayoutComponent,
    HomeComponent,
    ListComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    ErrorPagesModule,
    HttpClientModule,
    routing,
    UiModule,
  ],
  providers: [
    appRoutingProviders,
    DatabaseService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
