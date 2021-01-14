import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Photo } from '../interfaces/photo.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PhotoService extends AbstractService<Photo> {

  constructor(protected http: HttpClient) {
    super(http);
    this.url += '/photo';
  }

  getFileUrl(photo: Photo): string {
    if (environment.name === "ghpages" || environment.name === "dev") {
      return `https://picsum.photos/id/${photo.idPhoto}/${photo.width}/${photo.height}`
    } else {
      return this.url + '/' + photo.idPhoto + '/image'
    }
  }

  getFile(photo: Photo): Observable<string> {
    return this.http.get(this.getFileUrl(photo), { responseType: 'blob', observe: 'response' }).pipe(
      map(api => api.body),
      map(body => {
        const blob = new Blob([body], { type: 'image/jpg' });
        return URL.createObjectURL(blob);
      })
    );
  }

  getFileFromUrl(url: string): Observable<any> {
    return this.http.get(url, { responseType: 'blob', observe: 'response' }).pipe(
      map(api => api.body),
      map(body => {
        const blob = new Blob([body], { type: 'image/jpg' });
        return URL.createObjectURL(blob);
      })
    );
  }
}
