import { Component, ChangeDetectionStrategy, Input, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IntersectionStatus } from '../../enums/intersection-status.enum';
import { PhotoExternalService } from '../../services/photo-external.service';

@Component({
  selector: 'image-lazy-loading',
  templateUrl: './image-lazy-loading.component.html',
  styleUrls: ['./image-lazy-loading.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageLazyLoadingComponent {
  private subscription: Subscription = new Subscription();

  @Input() src!: string
  @Input() width: string = "300"
  @Input() height: string = "300"
  @Input() isBlob: boolean = false
  @ViewChild('img') img!: ElementRef;
  constructor(private photoExternalService: PhotoExternalService) { }

  onVisibilityChange(status: IntersectionStatus) {
    if (status == IntersectionStatus.VISIBLE && this.src) {
      if (this.isBlob) {
        this.subscription.add(this.getBlobUrl(this.src))
      } else {
        this.img.nativeElement.src = this.src
      }
    }
  }

  getBlobUrl(src: string): Subscription {
    return this.photoExternalService.getBlobUrl(src).subscribe(url => this.img.nativeElement.src = url)
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe()
  }
}
