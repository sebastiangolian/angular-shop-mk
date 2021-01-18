import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from '../../shared/services/abstract.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HelloService extends AbstractService<any> {

  constructor(protected http: HttpClient) {
    super(http);
    this.url += '/hello';
  }

  get200(): Observable<any> {
    return this.http.get<any>(this.url + '?name=200');
  }

  get400(): Observable<any> {
    return this.http.get<any>(this.url + '?name=400');
  }
}
