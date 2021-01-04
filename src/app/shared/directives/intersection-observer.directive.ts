import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IntersectionStatus } from '../enums/intersection-status.enum';

@Directive({
  selector: '[intersectionObserver]'
})
export class IntersectionObserverDirective implements OnInit {
  @Input() intersectionDebounce = 0;
  @Input() intersectionRootMargin = '0px';
  @Input() intersectionRoot!: HTMLElement;
  @Input() intersectionThreshold!: number | number[];
  @Output() visibilityChange = new EventEmitter<IntersectionStatus>();

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.visibilityChange.emit(IntersectionStatus.NOT_VISIBLE)

    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold
    }

    const intersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.visibilityChange.emit(IntersectionStatus.VISIBLE)
          observer.disconnect();
        }
      });
    }

    const observer = new IntersectionObserver(intersectionObserverCallback, config);
    observer.observe(this.element.nativeElement);
  }
}
