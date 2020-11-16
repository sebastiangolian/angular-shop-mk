import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderModel } from '../../models/order.model';
import { Order } from '../../interfaces/order.interface';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/services/basket.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  basketSumPrice$: Observable<number> = this.basketService.subjectSumPrice.asObservable()
  basketSumAmount$: Observable<number> = this.basketService.subjectSumAmount.asObservable()
  order: Order = new OrderModel();

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {}

  onSubmit(f:NgForm) {
    console.log("---- MODEL ----");
    console.log(this.order);
    console.log("---- FORM ----");
    console.log(f.value);
  }

}
