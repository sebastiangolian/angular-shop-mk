import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[focus]'
})
export class InputFocusDirective implements OnInit {

  constructor(protected el: ElementRef) {}

  ngOnInit(): void {
    const input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    input.focus();
    input.select();
  }
}
