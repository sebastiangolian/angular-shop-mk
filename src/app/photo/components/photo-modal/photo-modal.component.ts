import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/internal/Subject';
import { Photo } from '../../interfaces/photo.interface';

@Component({
  selector: 'photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoModalComponent implements OnInit {
  photo: Photo
  photos: Photo[]
  subject: Subject<Photo>
  currentIndex: number

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {}

  onPrev() {
    if(this.currentIndex == 0) 
      this.currentIndex = this.photos.length - 1
    else 
      this.currentIndex -= 1
    this.photo = this.photos[this.currentIndex]
  }

  onNext() {
    if(this.currentIndex == this.photos.length - 1) 
      this.currentIndex = 0
    else 
      this.currentIndex += 1
    this.photo = this.photos[this.currentIndex]
  }

  onCreate() {
    this.bsModalRef.hide();
    this.subject.next(this.photo);
    this.subject.complete();
  }

  onCancel() {
    this.bsModalRef.hide();
    this.subject.next(null);
    this.subject.complete();
  }

}
