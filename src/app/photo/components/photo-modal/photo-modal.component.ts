import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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
  subject: Subject<Photo>

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {}

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
