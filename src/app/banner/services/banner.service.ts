import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from '../../shared/services/abstract.service';
import { Banner } from '../interfaces/banner.interface';

@Injectable({providedIn: 'root'})
export class BannerService extends AbstractService<Banner> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/banner"
  }
}
