import { UserService } from './../../../user/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
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
          this.orders$ = this.orderService.get()
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
          return this.orderService.getById(this.activeIdOrder)
        } else {
          return of(null)
        }
      })
    )
  }
}
