import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { OrderAgreement } from '../interfaces/order-agreement.interface';

@Injectable({providedIn: 'root'})
export class OrderAgreementService extends AbstractService<OrderAgreement> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/order-agreement"
  }
}
