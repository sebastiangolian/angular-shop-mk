import { UserService } from './../../../user/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { ApiList } from 'src/app/shared/interfaces/api-list.interface';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/offer.service';
import { User } from 'src/app/user/interfaces/user.interface';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders$: Observable<Order[]>
  order$: Observable<Order>
  activeIdOrder: string
  currentUser$: Observable<User>

  constructor(private orderService: OrderService, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser.pipe(
      tap(user => {
        if(user.isIndividual) {
          this.orders$ = this.getOrders()
        } else {
          this.orders$ = of(null)
        }
      })
    )
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

  private getOrders(): Observable<Order[]|null> {
    return this.orderService.get().pipe(
      map((orders: ApiList<Order>) => {
        if(orders.items.length > 0) {
          return orders.items
        } else {
          return null
        }
      })
    )
  }
}
