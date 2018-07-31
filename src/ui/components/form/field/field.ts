import { Component, EventEmitter, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  inputs: ['controlName', 'fieldId', 'formGroup', 'placeholder', 'required', 'title'],
  outputs: ['formGroupChange', 'onValueChange'],
})
export abstract class Field implements OnInit {
  /** Inputs */
  public controlName: string = 'field-control-name'
  public fieldId: string // Each component must have it's own ID
  public formGroup: FormGroup
  public placeholder: string
  public required: boolean
  public title: string

  /** Outputs */
  public formGroupChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>()
  public onValueChange: EventEmitter<any> = new EventEmitter<any>()

  ngOnInit() {
    this.formGroup = this.formGroup || new FormBuilder().group({ [`${this.controlName}`]: [] })
  }

  /**
   * Method to return the field generic classes
   * @returns { Object }
   */
  public getClasses(): Object {
    return {
      error: this.isInvalid(this.controlName),    // Added when formGroup is invalid
      'field--has-value': this.hasValue(),        // Added when input has value
      'field--is-focused': this.isFocused(),      // Added when input is focused
      'field--move-label-up': this.moveLabelUp(), // Added when label needs to move up
    }
  }

  /**
   * Method to check whether the input content is invalid
   * @param { string } controlName
   * @param { string } rule
   * @returns { boolean }
   */
  protected isInvalid(controlName: string, rule?: string) {
    const fieldControl = this.formGroup.controls[controlName]
    return fieldControl.touched && (rule ? fieldControl.hasError(rule) : fieldControl.invalid)
  }

  /**
   * Method to check if it needs to show the label '* required'
   * @returns { boolean }
   */
  protected showRequired(): boolean {
    return this.required
      && (!this.isInvalid(this.controlName) || this.isInvalid(this.controlName, 'required'))
  }

  /**
   * Check whether the field has a selected value
   * @return { boolean }
   */
  protected abstract hasValue(): boolean

  /**
   * Check whether the field is focused
   * @return { boolean }
   */
  protected abstract isFocused(): boolean

  /**
   * Check whether it needs to move the label up
   * @return { boolean }
   */
  protected abstract moveLabelUp(): boolean
}
