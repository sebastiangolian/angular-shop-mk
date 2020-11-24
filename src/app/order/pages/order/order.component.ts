import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderModel } from '../../models/order.model';
import { Order } from '../../interfaces/order.interface';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/services/basket.service';
import { OrderService } from '../../services/offer.service';
import { map } from 'rxjs/operators';
import { BasketSummary } from 'src/app/basket/interfaces/basket-summary';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  basketSummary$: Observable<BasketSummary> = this.basketService.subjectSummary.asObservable()
  order$: Observable<Order> = this.orderService.getOne().pipe(map(api=>api.item))
  order: Order = new OrderModel();

  constructor(private basketService: BasketService, private orderService: OrderService) { }

  ngOnInit(): void {}

  onSubmit(f:NgForm) {
    console.log("---- MODEL ----");
    console.log(this.order);
    console.log("---- FORM ----");
    console.log(f.value);
  }

}
