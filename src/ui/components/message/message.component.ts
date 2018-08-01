import { Component } from '@angular/core'

import { Message } from '../../models/message.model'

@Component({
  selector: 'ui-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  inputs: ['message'],
})
export class MessageComponent {
  /** Inputs */
  public message: Message

  getClasses(): Object {
    return {
      [`message--${this.message.type}`]: !!this.message.type,
    }
  }
}
