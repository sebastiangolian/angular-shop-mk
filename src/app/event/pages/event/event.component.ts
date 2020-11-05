import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event.interface';
import { ApiList } from 'src/app/shared/interfaces/api-list.interface';
import { map } from 'rxjs/operators';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { PhotoService } from 'src/app/photo/services/photo.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {

  events: Observable<Event[]>;
  photos: Observable<Photo[]>;
  private _subscription: Subscription = new Subscription();

  constructor(private eventService: EventService, private photoService: PhotoService) { }

  ngOnInit(): void {
    this.onRefresh()
  }

  onRefresh() {
    this.events = this.getEvents()
    this.photos = this.getPhotos()
  }

  onItemSelected(event: Event) {
    console.log(event)
  }

  private getEvents(): Observable<Event[]> {
    return this.eventService.get().pipe(
      map((events: ApiList<Event>) => events.items)
    )
  }

  private getPhotos(): Observable<Photo[]> {
    return this.photoService.get().pipe(
      map((photos: ApiList<Photo>) => photos.items)
    )
  }

  ngOnDestroy() {
    if(this._subscription) this._subscription.unsubscribe()
  }

}
