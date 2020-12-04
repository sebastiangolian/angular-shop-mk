import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Log } from '../interfaces/log.interface';

@Injectable({providedIn: 'root'})
export class LogService extends AbstractService<Log> {

  constructor(protected http: HttpClient) { 
    super(http) 
    this.url += "/log"
  }
}
