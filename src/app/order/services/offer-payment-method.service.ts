import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { OrderPaymentMethod } from '../interfaces/order-payment-method.interface';

@Injectable({providedIn: 'root'})
export class OrderPaymentMethodService extends AbstractService<OrderPaymentMethod> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/order-payment-method"
  }
}
