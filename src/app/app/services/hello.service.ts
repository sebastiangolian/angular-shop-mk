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

  getByName(name: string): Observable<any> {
    return this.http.get<any>(this.url + '?name=' + name);
  }
}
