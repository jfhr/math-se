import {Directive, ElementRef, OnInit, Renderer2} from '@angular/core';


@Directive({
  selector: '[appAutoFocusOnShow]'
})
export class AutoFocusOnShowDirective implements OnInit {
  constructor(public renderer: Renderer2, public elementRef: ElementRef) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.focus();
  }
}
