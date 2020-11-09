import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { Offer } from 'src/app/offer/interfaces/offer.interface';
import { OfferService } from 'src/app/offer/services/offer.service';
import { ApiList } from 'src/app/shared/interfaces/api-list.interface';
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
  offers$: Observable<Offer[]>
  currentIndex: number

  constructor(public bsModalRef: BsModalRef, public offerService: OfferService) { }

  ngOnInit(): void {
    this.offers$ = this.offerService.get().pipe(
      map((offers: ApiList<Offer>) => offers.items)
    )
  }

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
