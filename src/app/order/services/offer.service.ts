import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Order } from '../interfaces/order.interface';
import { Observable } from 'rxjs';
import { Api } from 'src/app/shared/interfaces/api.interface';

@Injectable({providedIn: 'root'})
export class OrderService extends AbstractService<Order> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/order"
  }

  mock(item: Order): Observable<Api<Order>> {
    item = this._trimItem(item)
    return this.http.post<Api<Order>>(this.url+"/mock", item);
  }
}
