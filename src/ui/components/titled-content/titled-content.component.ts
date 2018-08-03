import { Component } from '@angular/core'

@Component({
  selector: 'ui-titled-content',
  templateUrl: './titled-content.component.html',
  styleUrls: ['./titled-content.component.scss'],
  inputs: ['color', 'title'],
})
export class TitledContentComponent {
  /** Inputs */
  public color: string = 'light'
  public title: string

  public getTitleClasses(): Object {
    return {
      [`titled-content__title--${ this.color }`]: !!this.color,
    }
  }
}
