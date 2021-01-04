import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotoExternalService {

  constructor(protected http: HttpClient) { }

  getBlobUrl(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'blob', observe: 'response' }).pipe(
      map(api => api.body),
      map(body => {
        if (body) {
          const blob = new Blob([body], { type: 'image/jpeg' });
          return URL.createObjectURL(blob);
        } else {
          return null
        }
      })
    );
  }

}
