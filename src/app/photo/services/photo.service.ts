import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Photo } from '../interfaces/photo.interface';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PhotoService extends AbstractService<Photo> {

  constructor(protected http: HttpClient) {
    super(http);
    this.url += '/photo';
  }

  getFile(photo: Photo): Observable<string> {
    return this.http.get(this.url + '/' + photo.idPhoto + '/image', {responseType: 'blob', observe: 'response'}).pipe(
      map(api => api.body),
      map(body => {
        const blob = new Blob([body], {type: 'image/jpg'});
        return URL.createObjectURL(blob);
      })
    );
  }

  getFileFromUrl(url: string): Observable<any> {
    return this.http.get(url, {responseType: 'blob', observe: 'response'}).pipe(
      map(api => api.body),
      map(body => {
        const blob = new Blob([body], {type: 'image/jpg'});
        return URL.createObjectURL(blob);
      })
    );
  }
}
