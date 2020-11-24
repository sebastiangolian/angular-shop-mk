import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Order } from '../interfaces/order.interface';

@Injectable({providedIn: 'root'})
export class OrderService extends AbstractService<Order> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/order"
  }
}
