import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { OrderDefinition } from '../interfaces/order-definition.interface';

@Injectable({providedIn: 'root'})
export class OrderDefinitionService extends AbstractService<OrderDefinition> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/order-definition"
  }
}
