import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/event/interfaces/event.interface';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'basket-list',
  templateUrl: './basket-list.component.html',
  styleUrls: ['./basket-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketListComponent implements OnInit, OnDestroy {

  @Input() event: Event;
  photos: Photo[];
  private subscription: Subscription = new Subscription();

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this.subscription.add(this.getBasketItems());
  }

  getBasketItems(): Subscription {
    return this.basketService.subjectItems.asObservable().
    pipe(
      map((items) => {
        const filterItems = items.filter(item => item.photo.idEvent === this.event.idEvent);
        this.photos = this.getUniquePhotos(filterItems);
        return filterItems;
      })
    ).subscribe();
  }

  getUniquePhotos(basketItems): any[] {
    return basketItems
    .filter(
      (item, i, arr) => arr.findIndex(t => t.photo.idPhoto === item.photo.idPhoto) === i
    )
    .map((item) => item.photo);
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }
}
