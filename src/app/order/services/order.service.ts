import { OrderPayment } from '../interfaces/order-payment.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Order } from '../interfaces/order.interface';
import { Observable } from 'rxjs';
import { Api } from 'src/app/shared/interfaces/api.interface';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class OrderService extends AbstractService<Order> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/order"
  }

  getPayment(idOrder: string): Observable<OrderPayment> {
    return this.http.get<Api<OrderPayment>>(this.url + "/" + idOrder + "/payment").pipe(
        map(api => {
            if(api.item) {
                return api.item
            } else {
                return null
            }
        })
    );
}

  mock(item: Order): Observable<Api<Order>> {
    item = this._trimItem(item)
    return this.http.post<Api<Order>>(this.url+"/mock", item);
  }
}
