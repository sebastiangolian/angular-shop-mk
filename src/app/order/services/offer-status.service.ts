import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { OrderPaymentStatus } from '../interfaces/order-payment-status.interface';

@Injectable({providedIn: 'root'})
export class OrderPaymentStatusService extends AbstractService<OrderPaymentStatus> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/order-payment-status"
  }
}
