import { Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotoModalComponent } from 'src/app/photo/components/photo-modal/photo-modal.component';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { Product } from 'src/app/product/interfaces/product.interface';
import { BasketItem } from '../../interfaces/basket-item.interface';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'basket-event-photo',
  templateUrl: './basket-event-photo.component.html',
  styleUrls: ['./basket-event-photo.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketEventPhotoComponent implements OnInit {

  @Input() photo: Photo
  @Input() basketItems$: Observable<BasketItem[]>
  private _subscription: Subscription = new Subscription();
  constructor(private basketService: BasketService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.basketItems$ = this.basketService.subjectItems.asObservable().pipe(
      map(items => items.filter(item => item.photo.idPhoto == this.photo.idPhoto))
    )
  }

  onChangeAmount(product: Product, amount: number): void {
    let basketItem: BasketItem = {
      amount: amount,
      price: product.price,
      photo: this.photo,
      product: product
    }
    this.basketService.update(basketItem)
    if(amount == 0) this.onTrashClick(basketItem)
  }

  onTrashClick(basketItem: BasketItem) {
    this.basketService.delete(basketItem)
  }

  onPhotoSelected(photo: Photo) {
    this._subscription.add(this.photoModal(photo).subscribe())
  }

  private photoModal(photo: Photo): Observable<Photo> {
    const subject = new Subject<Photo>();
    this.modalService.show(PhotoModalComponent, {
      initialState: {
        photo: photo,
        photos: [photo],
        currentIndex: 0
      },
      class: 'modal-xl pt-4',
      ignoreBackdropClick: true
    }).content.subject = subject
    return subject
  }

}