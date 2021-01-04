import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[lazyLoadingImage]'
})
export class LazyLoadingImageDirective {
  private subscription: Subscription = new Subscription();

  @Input() isBlob: boolean = false
  @Output() visibleChange = new EventEmitter<boolean>();
  private isVisible = false

  constructor(private element: ElementRef, protected http: HttpClient) {
    this.visibleChange.emit(false)

    const intersectionObserverCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.isVisible) {
          if (this.isBlob) {
            this.subscription.add(this.getBlobUrlSubscription(this.element.nativeElement.getAttribute('data-src')))
          } else {
            this.element.nativeElement.src = this.element.nativeElement.getAttribute('data-src')
          }
          this.isVisible = true
          this.visibleChange.emit(true)
        }
      });
    }

    const observer = new IntersectionObserver(intersectionObserverCallback);
    observer.observe(this.element.nativeElement);
  }

  getBlobUrlObservable(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'blob', observe: 'response' }).pipe(
      map(api => api.body),
      map(body => {
        if (body) {
          return URL.createObjectURL(new Blob([body]));
        } else {
          return ''
        }
      })
    );
  }

  getBlobUrlSubscription(src: string): Subscription {
    return this.getBlobUrlObservable(src).subscribe(url => this.element.nativeElement.src = url)
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe()
  }

}
