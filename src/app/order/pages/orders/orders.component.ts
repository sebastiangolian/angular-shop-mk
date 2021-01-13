import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/user/interfaces/user.interface';
import { UserService } from 'src/app/user/services/user.service';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<Order[]>;
  activeIdOrder: string;
  currentUser$: Observable<User>;

  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser$ = this.userService.currentUser.pipe(
      tap(user => {
        if (user.isIndividual) {
          this.orders$ = this.orderService.get();
        } else {
          this.orders$ = of(null);
        }
      })
    );
  }
}
