import { Component, ElementRef, ViewChild } from '@angular/core'

import { Field } from '../field/field'

@Component({
  selector: 'ui-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss'],
  inputs: ['controlName', 'fieldId', 'formGroup', 'placeholder', 'required', 'title', 'type'],
  outputs: ['formGroupChange', 'onValueChange'],
})
export class TextFieldComponent extends Field {
  /** Inputs */
  public type: string = 'text'

  /** Component variables */
  private focus: boolean

  @ViewChild('inputField')
  private inputField: ElementRef

  /** Method to remove 'is-focused' class off the component when input is out of focus */
  public onBlur() {
    this.focus = false
  }

  /**
   * Emits the text value when it changes
   * @param event
   */
  public onChange(event) {
    this.onValueChange.emit(event.target.value)
  }

  /** Method to add 'is-focused' class off the component when input is out of focus */
  public onFocus() {
    this.focus = true
  }

  /**
   * Check whether the field has a selected value
   * @return { boolean }
   */
  protected hasValue(): boolean {
    return !!this.inputField.nativeElement.value
  }

  /**
   * Check whether the field is focused
   * @return { boolean }
   */
  protected isFocused(): boolean {
    return this.focus
  }

  /**
   * Check whether it needs to move the label up
   * @return { boolean }
   */
  protected moveLabelUp(): boolean {
    return this.hasValue() || this.focus || !!this.placeholder
  }
}
