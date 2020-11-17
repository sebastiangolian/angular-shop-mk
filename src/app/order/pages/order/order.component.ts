import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderModel } from '../../models/order.model';
import { Order } from '../../interfaces/order.interface';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/services/basket.service';
import { OrderAgreementService } from '../../services/offer-agreement.service';
import { OrderPaymentMethod } from '../../interfaces/order-payment-method.interface';
import { map } from 'rxjs/operators';
import { OrderAgreement } from '../../interfaces/order-agreement.interface';
import { OrderPaymentMethodService } from '../../services/offer-payment-method.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  basketSumPrice$: Observable<number> = this.basketService.subjectSumPrice.asObservable()
  basketSumAmount$: Observable<number> = this.basketService.subjectSumAmount.asObservable()
  agreements$: Observable<OrderAgreement[]> = this.orderAgreementService.get().pipe(map(items=>items.items))
  paymentMethods$: Observable<OrderPaymentMethod[]> = this.orderPaymentMethodService.get().pipe(map(items=>items.items))
  order: Order = new OrderModel();

  constructor(private basketService: BasketService, private orderAgreementService: OrderAgreementService, private orderPaymentMethodService: OrderPaymentMethodService) { }

  ngOnInit(): void {
    this.order.firstname = "Jan"
    this.order.lastname = "Kowalski"
    this.order.phone = "777777777"
    this.order.email = "kowalskijan@gmail.com"
    this.order.emailConfirm = "kowalskijan@gmail.com"
  }

  onSubmit(f:NgForm) {
    console.log("---- MODEL ----");
    console.log(this.order);
    console.log("---- FORM ----");
    console.log(f.value);
  }

}
