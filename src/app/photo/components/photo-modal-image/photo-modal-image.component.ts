import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, OnChanges, HostListener } from '@angular/core';
import { Photo } from '../../interfaces/photo.interface';

@Component({
  selector: 'photo-modal-image',
  templateUrl: './photo-modal-image.component.html',
  styleUrls: ['./photo-modal-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoModalImageComponent implements OnChanges {

  @Input() photo: Photo;
  @Input() arrowEnabled: boolean;
  @Input() src: string;

  @Output() prev: EventEmitter<boolean> = new EventEmitter();
  @Output() next: EventEmitter<boolean> = new EventEmitter();

  right: number = 22
  left: number = 22
  top: number = 260
  constructor() { }

  @HostListener('window:resize', ['$event'])
  ngOnChanges() {
    this.setPosition()
  }

  setPosition() {
    if (this.isVertical()) {
      this.top = 260
      switch (true) {
        case window.innerWidth < 445:
          this.top = this.top + (window.innerWidth - 445) / 2
          this.left = this.right = 22
          break;
        case window.innerWidth >= 445 && window.innerWidth < 576:
          this.left = this.right = 22 + (window.innerWidth - 445) / 2
          break;
        case window.innerWidth >= 576 && window.innerWidth < 992:
          this.left = this.right = 55
          break;
        case window.innerWidth >= 992 && window.innerWidth < 1200:
          this.left = this.right = 22
          break;
        default:
          this.top = 270
          this.left = this.right = 90
      }
    } else {
      this.left = this.right = 22

      switch (true) {
        case window.innerWidth < 445:
          this.top = 130 + (window.innerWidth - 445) / 2
          break;
        case window.innerWidth < 992:
          this.top = 130
          break;
        case window.innerWidth < 1200:
          this.top = 100
          break;
        default:
          this.top = 150
      }
    }
  }

  isVertical(): boolean {
    if (this.photo.height > this.photo.width) {
      return true
    } else {
      return false
    }
  }

  onPrev(): void {
    this.prev.emit(true)
  }

  onNext(): void {
    this.next.emit(true)
  }
}
