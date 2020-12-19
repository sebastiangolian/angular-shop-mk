import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[lazyLoadImage]'
})
export class LazyLoadImageDirective {

    constructor(private el: ElementRef) {
        this.applyLazyLoading();
    }

    private static lazyLoadImage($el: HTMLImageElement) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    $el.src = $el.dataset.src;
                    $el.className = $el.dataset.class;
                    observer.disconnect();
                }
            });
        });
        observer.observe($el);
    }

    applyLazyLoading() {
        const $el = this.el.nativeElement;
        LazyLoadImageDirective.lazyLoadImage($el);
    }
}
