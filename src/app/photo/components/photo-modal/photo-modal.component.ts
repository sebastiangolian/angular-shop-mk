import { BasketItem } from './../../../basket/interfaces/basket-item.interface';
import { PhotoExternalService } from './../../../shared/services/photo-external.service';
import { Component, OnInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/event/interfaces/event.interface';
import { Offer } from 'src/app/offer/interfaces/offer.interface';
import { OfferService } from 'src/app/offer/services/offer.service';
import { Photo } from '../../interfaces/photo.interface';
import { PhotoService } from '../../services/photo.service';
import { BasketService } from 'src/app/basket/services/basket.service';

@Component({
  selector: 'photo-modal',
  templateUrl: './photo-modal.component.html',
  styleUrls: ['./photo-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoModalComponent implements OnInit {
  photo: Photo;
  event: Event;
  photos: Photo[];
  subject: Subject<Photo>;
  offers$: Observable<Offer[]>;
  currentIndex: number;
  src$: Observable<string>

  constructor(private bsModalRef: BsModalRef, private offerService: OfferService, private router: Router, private basketService: BasketService,
    private photoService: PhotoService, private photoExternalService: PhotoExternalService) { }

  ngOnInit(): void {
    this.offers$ = this.getOffers().pipe(
      map(offers => {
        let retOffers: Offer[] = offers
        retOffers.forEach(offer => this.basketService.updateOfferAmount(offer, this.event))
        return retOffers
      })
    );
    this.src$ = this.photoExternalService.getBlobUrl(this.photoService.getFileUrl(this.photo))
  }

  private getOffers(): Observable<Offer[]> {
    const filters = { idPhoto: this.photo.idPhoto };
    return this.offerService.get(0, 0, null, null, filters);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "ArrowLeft") this.onPrev()
    if (event.key === "ArrowRight") this.onNext()
  }

  onPrev() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.photos.length - 1;
    }
    else {
      this.currentIndex -= 1;
    }
    this.photo = this.photos[this.currentIndex];
    this.ngOnInit();
  }

  onNext() {
    if (this.currentIndex === this.photos.length - 1) {
      this.currentIndex = 0;
    }
    else {
      this.currentIndex += 1;
    }
    this.photo = this.photos[this.currentIndex];
    this.ngOnInit();
  }

  onBasketClick() {
    this.onCancel();
    this.router.navigate(['basket']);
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
