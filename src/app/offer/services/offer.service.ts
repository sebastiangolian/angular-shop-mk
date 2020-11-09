import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Offer } from '../interfaces/offer.interface';

@Injectable({providedIn: 'root'})
export class OfferService extends AbstractService<Offer> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/offer"
  }
}
