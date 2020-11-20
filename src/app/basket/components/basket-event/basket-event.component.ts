import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Event } from 'src/app/event/interfaces/event.interface';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'basket-event',
  templateUrl: './basket-event.component.html',
  styleUrls: ['./basket-event.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketEventComponent implements OnInit, OnDestroy {

  @Input() event: Event
  photos: Photo[]
  private _subscription: Subscription = new Subscription();

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
    this._subscription.add(this.getBasketItems())
  }

  public getBasketItems(): Subscription {
    return this.basketService.subjectItems.asObservable().
    pipe(
      map((items) => {
        const filterItems = items.filter((items) => items.photo.idEvent == this.event.idEvent)
        this.photos = this.getUniquePhotos(filterItems)
        return filterItems
      })
    ).subscribe()
  }

  public getUniquePhotos(basketItems): any[] {
    return basketItems
    .filter(
      (item, i, arr) => arr.findIndex(t => t.photo.idPhoto === item.photo.idPhoto) === i
    )
    .map((item)=> item.photo)
  }

  ngOnDestroy() {
		if (this._subscription) this._subscription.unsubscribe()
	}
}
