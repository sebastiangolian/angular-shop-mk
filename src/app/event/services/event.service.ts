import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractService } from 'src/app/shared/services/abstract.service';
import { Event } from '../interfaces/event.interface';

@Injectable({providedIn: 'root'})
export class EventService extends AbstractService<Event> {

  constructor(protected http: HttpClient) {
    super(http);
    this.url += '/event';
  }
}
