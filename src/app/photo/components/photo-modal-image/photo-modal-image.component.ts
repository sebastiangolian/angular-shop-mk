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

  leftRight: number = 22
  constructor() { }

  @HostListener('window:resize', ['$event'])
  ngOnChanges() {
    this.getLeftRight()
  }

  getLeftRight() {
    if (this.photo.height >= 600) {
      switch (true) {
        case window.innerWidth < 445:
          this.leftRight = 22
          break;
        case window.innerWidth >= 445 && window.innerWidth < 576:
          this.leftRight = 22 + (window.innerWidth - 445) / 2
          break;
        case window.innerWidth >= 576 && window.innerWidth < 992:
          this.leftRight = 55
          break;
        case window.innerWidth >= 992 && window.innerWidth < 1200:
          this.leftRight = 22
          break;
        default:
          this.leftRight = 90
      }
    } else {
      this.leftRight = 22
    }
  }

  onPrev(): void {
    this.prev.emit(true)
  }

  onNext(): void {
    this.next.emit(true)
  }
}
