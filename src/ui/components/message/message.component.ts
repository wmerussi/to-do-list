import { Component } from '@angular/core'

@Component({
  selector: 'ui-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  inputs: ['type'],
})
export class MessageComponent {
  /** Inputs */
  public type: string = 'info'

  getClasses(): Object {
    return {
      [`message--${this.type}`]: !!this.type,
    }
  }
}
