import { Component } from '@angular/core'

@Component({
  selector: 'ui-titled-content',
  templateUrl: './titled-content.component.html',
  styleUrls: ['./titled-content.component.scss'],
  inputs: ['title'],
})
export class TitledContentComponent {
  /** Inputs */
  public title: string
}
