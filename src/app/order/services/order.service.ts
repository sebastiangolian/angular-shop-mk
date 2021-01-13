import { OrderAgreement } from './../interfaces/order-agreement.interface';
import { BasketItem } from './../../basket/interfaces/basket-item.interface';
import { environment } from './../../../environments/environment';
import { OrderPayment } from '../interfaces/order-payment.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Order } from '../interfaces/order.interface';
import { Observable } from 'rxjs';
import { Api } from 'src/app/shared/interfaces/api.interface';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OrderService extends AbstractService<Order> {

  constructor(protected http: HttpClient) {
    super(http);
    this.url += '/order';
  }

  post(item: Order): Observable<any> {
    item = this.trimItem(item);
    if (environment.name === 'prod' || environment.name === 'test') {
      item = this.compressOrder(item)
    }

    return this.http.post<any>(this.url, item);
  }

  private compressOrder(order: Order): Order {
    let orderClone: Order = JSON.parse(JSON.stringify(order));

    if (orderClone.paymentMethod) {
      if (orderClone.paymentMethod.content) delete orderClone.paymentMethod.content;
    }

    if (orderClone.deliveryMethod) {
      if (orderClone.deliveryMethod.content) delete orderClone.deliveryMethod.content;
    }

    if (order.agreements) {
      orderClone.agreements.forEach((agreement: OrderAgreement, index: number) => {
        if (agreement.required) delete orderClone.agreements[index].required;
        if (agreement.content) delete orderClone.agreements[index].content;
      })
    }

    if (orderClone.agreements) {
      orderClone.items.forEach((item: BasketItem, index: number) => {
        if (item.event) delete orderClone.items[index].event;
        if (item.photo) delete orderClone.items[index].photo;
        if (item.price) delete orderClone.items[index].price;
        if (item.product) {
          if (item.product.amount) delete orderClone.items[0].product.amount;
          if (item.product.name) delete orderClone.items[0].product.name;
          if (item.product.price) delete orderClone.items[0].product.price;
        }
      })
    }

    return orderClone
  }

  getPayment(idOrder: string): Observable<OrderPayment> {
    return this.http.get<Api<OrderPayment>>(this.url + '/' + idOrder + '/payment').pipe(
      map(api => {
        if (api.item) {
          return api.item;
        } else {
          return null;
        }
      })
    );
  }

  postPayment(idOrder: string): Observable<OrderPayment> {
    return this.http.post<Api<OrderPayment>>(this.url + '/' + idOrder + '/payment', null).pipe(
      map(api => {
        if (api.item) {
          return api.item;
        } else {
          return null;
        }
      })
    );
  }

  mock(idOrder: string): Observable<Api<Order>> {
    return this.http.get<Api<Order>>(this.url + '/' + idOrder + '/mock');
  }
}
