import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventService } from 'src/app/event/services/event.service';
import { ApiList } from 'src/app/shared/interfaces/api-list.interface';
import { BasketItem } from '../../interfaces/basket-item.interface';
import { BasketService } from '../../services/basket.service';
import { Event } from '../../../event/interfaces/event.interface';
import { BasketSummary } from '../../interfaces/basket-summary';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  events$: Observable<Event[]>
  basketItems: BasketItem[]
  basketSummary$: Observable<BasketSummary> = this.basketService.subjectSummary.asObservable()
  constructor(private basketService: BasketService, private eventService: EventService) { }

  ngOnInit(): void {
    this.basketItems = this.basketService.items
    this.events$ = this.getEvents()
  }

  private getEvents(): Observable<Event[]> {
    return this.eventService.get().pipe(
      map((events: ApiList<Event>) => events.items),
      map(items => items.filter(item => this.basketItems.find((bi) => bi.photo.idEvent == item.idEvent )))
    )
  }

  onBasketItemDelete(basketItem: BasketItem) {
    this.basketService.delete(basketItem) 
    this.ngOnInit()
  }

}
