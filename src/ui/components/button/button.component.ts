import { Component } from '@angular/core'

@Component({
  selector: 'ui-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  inputs: [
    'block',
    'border',
    'class',
    'disabled',
    'hideIcon',
    'iconName',
    'iconSize',
    'size',
    'type',
  ],
})
export class ButtonComponent {
  /** Inputs */
  public block: boolean
  public border: string
  public class: string
  public disabled: boolean
  public hideIcon: boolean
  public iconName: string
  public iconSize: string = 'small'
  public size: string = 'base'
  public type: string = 'text'

  protected getButtonClasses(): Object {
    return {
      [`button--block`]: this.block,
      [`button--${this.border}`]: !!this.border,
      [`button--${this.size}`]: !!this.size,
      [`button--${this.type}`]: !!this.type && !this.disabled,
      [`button--${this.type}-disabled`]: !!this.type && this.disabled,
      [`${this.class}`]: !!this.class,
    }
  }

  protected getIconClasses(): Object {
    return {
      [`icon--${this.iconName}`]: !!this.iconName,
      [`icon--${this.iconSize}`]: !!this.iconSize,
    }
  }
}
