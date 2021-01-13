import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Order } from '../../interfaces/order.interface';
import { OrderService } from '../../services/order.service';
import { User } from 'src/app/user/interfaces/user.interface';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order$: Observable<Order>;
  activeIdOrder: string;
  currentUser$: Observable<User>;

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.order$ = this.getOrder();
  }

  private getOrder(): Observable<Order | null> {
    return this.route.url.pipe(
      mergeMap(segement => {
        if (segement.length > 0) {
          this.activeIdOrder = segement[0].path;
          return this.orderService.getById(this.activeIdOrder);
        } else {
          return of(null);
        }
      })
    );
  }
}
