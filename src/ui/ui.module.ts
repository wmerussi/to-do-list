/** Angular imports */
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

/** Component imports */
import { ButtonComponent } from './components/button/button.component'
import { LinkComponent } from './components/link/link.component'
import { TextFieldComponent } from './components/form/text-field/text-field.component'

@NgModule({
  declarations: [
    ButtonComponent,
    LinkComponent,
    TextFieldComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ButtonComponent,
    LinkComponent,
    TextFieldComponent,
  ],
})
export class UiModule { }
