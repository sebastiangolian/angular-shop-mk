import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ApiList } from 'src/app/shared/interfaces/api-list.interface';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/offer.service';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders$: Observable<Order[]>
  order$: Observable<Order>
  activeIdOrder: string

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orders$ = this.getOrders()
    this.order$ = this.getOrder()
  }

  private getOrder(): Observable<Order|null> {
    return this.route.url.pipe(
      mergeMap(segement => {
        if(segement.length > 0) {
          this.activeIdOrder = segement[0].path
          return this.orderService.getById(this.activeIdOrder).pipe(
            map(api => api.item)
          )
        } else {
          return of(null)
        }
      })
    )
  }

  private getOrders(): Observable<Order[]> {
    return this.orderService.get().pipe(
      map((orders: ApiList<Order>) => orders.items)
    )
  }
}
