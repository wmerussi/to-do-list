/** Angular imports */
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

/** Component imports */
import { ButtonComponent } from './components/button/button.component'
import { LinkComponent } from './components/link/link.component'
import { MessageComponent } from './components/message/message.component'
import { TextFieldComponent } from './components/form/text-field/text-field.component'
import { TitledContentComponent } from './components/titled-content/titled-content.component'

import { FloatingCenteredContentComponent }
  from './components/floating-centered-content/floating-centered-content'

@NgModule({
  declarations: [
    ButtonComponent,
    FloatingCenteredContentComponent,
    LinkComponent,
    MessageComponent,
    TextFieldComponent,
    TitledContentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ButtonComponent,
    FloatingCenteredContentComponent,
    LinkComponent,
    MessageComponent,
    TextFieldComponent,
    TitledContentComponent,
  ],
})
export class UiModule { }
