import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Photo } from '../interfaces/photo.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PhotoService extends AbstractService<Photo> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/photo"
  }

  getFile(photo: Photo): Observable<any> {
    return this.http.get(this.url + "/file/" + photo.idPhoto + "/image", {responseType: 'blob', observe: 'response'})
  }

  getFileFromUrl(url:string): Observable<any> {
    return this.http.get(url, {responseType: 'blob', observe: 'response'})
  }
}
