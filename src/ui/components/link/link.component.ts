import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core'

import { ButtonComponent } from '../button/button.component'

@Component({
  selector: 'ui-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  inputs: [
    'disabled',
    'hideIcon',
    'href',
    'iconName',
    'iconSize',
    'routerLink',
    'strong',
    'type',
  ],
})
export class LinkComponent extends ButtonComponent implements OnInit {
  /** Inputs */
  public href: string
  public routerLink: string
  public strong: boolean
  public type: string = 'base'

  @ViewChild('anchor')
  private anchor: ElementRef

  constructor(private renderer: Renderer2) {
    super()
  }

  ngOnInit() {
    /** If there is no href or routerLink, set role="button" */
    if (!this.href && !this.routerLink) {
      this.renderer.setAttribute(this.anchor.nativeElement, 'role', 'button')
      return
    }

    /** Set href to 'a' tag, if href is informed */
    !!this.href
      && this.renderer.setAttribute(this.anchor.nativeElement, 'href', this.href)

    /** Set reouterLink to 'a' tag, if routerLink is informed */
    !!this.routerLink
      && this.renderer.setAttribute(this.anchor.nativeElement, 'routerLink', this.routerLink)
  }

  /** Returns all link classes */
  public getLinkClasses(): Object {
    return {
      ...this.getButtonClasses(),
      [`link--${ this.type }`]: !!this.type,
      [`link--strong`]: this.strong,
    }
  }

  /** Returns if is arrow type */
  public isArrow(): boolean {
    return this.type === 'arrow'
  }

  /** Returns all button classes if type equals button */
  protected getButtonClasses(): Object {
    return (this.type === 'button') && {
      ...super.getButtonClasses(),
      'link--button': true,
    }
  }
}