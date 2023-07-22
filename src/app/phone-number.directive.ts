import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[phoneNumber]'
})
export class PhoneNumberDirective {

  constructor(private el: ElementRef) {

  }
}
