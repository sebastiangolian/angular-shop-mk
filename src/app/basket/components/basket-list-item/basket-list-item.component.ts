import { PhotoService } from 'src/app/photo/services/photo.service';
import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/event/interfaces/event.interface';
import { PhotoModalComponent } from 'src/app/photo/components/photo-modal/photo-modal.component';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { Product } from 'src/app/product/interfaces/product.interface';
import { BasketItem } from '../../interfaces/basket-item.interface';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'basket-list-item',
  templateUrl: './basket-list-item.component.html',
  styleUrls: ['./basket-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketListItemComponent implements OnInit, OnDestroy {

  @Input() event: Event;
  @Input() photo: Photo;
  @Input() basketItems$: Observable<BasketItem[]>;
  src!: string;

  private subscription: Subscription = new Subscription();
  constructor(private basketService: BasketService, private modalService: BsModalService, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.basketItems$ = this.basketService.subjectItems.asObservable().pipe(
      map(items => items.filter(item => item.photo.idPhoto === this.photo.idPhoto))
    );

    this.src = this.photoService.getFileUrl(this.photo);
  }

  onChangeAmount(product: Product, amount: number): void {
    const basketItem: BasketItem = {
      amount,
      price: product.price,
      photo: this.photo,
      product,
      event: this.event
    };

    this.basketService.update(basketItem);
    if (amount === 0) { this.onTrashClick(basketItem); }
  }

  onTrashClick(basketItem: BasketItem) {
    this.basketService.delete(basketItem);
  }

  onPhotoSelected(photo: Photo) {
    this.subscription.add(this.photoModal(photo).subscribe());
  }

  private photoModal(photo: Photo): Observable<Photo> {
    const subject = new Subject<Photo>();
    this.modalService.show(PhotoModalComponent, {
      initialState: {
        event: this.event,
        photo,
        photos: [photo],
        currentIndex: 0
      },
      class: 'modal-xl pt-4',
      ignoreBackdropClick: true
    }).content.subject = subject;
    return subject;
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
