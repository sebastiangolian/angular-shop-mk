import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event.interface';
import { ApiList } from 'src/app/shared/interfaces/api-list.interface';
import { map } from 'rxjs/operators';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { PhotoService } from 'src/app/photo/services/photo.service';
import { PhotoModalComponent } from 'src/app/photo/components/photo-modal/photo-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {

  events: Observable<Event[]>;
  photos: Observable<Photo[]>;
  private _subscription: Subscription = new Subscription();

  constructor(private eventService: EventService, private photoService: PhotoService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.events = this.getEvents()
  }

  onEventSelected(event: Event) {
    this.photos = this.getPhotos(event.idEvent)
  }

  onPhotoSelected(photo: Photo) {
    this._subscription.add(this.postPhotoModal(photo))
  }

  private getEvents(): Observable<Event[]> {
    return this.eventService.get().pipe(
      map((events: ApiList<Event>) => events.items)
    )
  }

  private getPhotos(idEvent: string): Observable<Photo[]> {
    let filters = {}
    filters["idEvent"] = idEvent
    return this.photoService.get(0, 0, null, null, filters).pipe(
      map((photos: ApiList<Photo>) => photos.items)
    )
  }

  private postPhotoModal(photo: Photo): Subscription {
    return this.photoModal(photo).subscribe({
      next: (photo: any) => {
        //if(role != null) this.postRole(role)
        console.log(photo)
      },
      error: (error) => console.error(error)
    })
  }

  private photoModal(photo: Photo): Observable<Photo> {
    const subject = new Subject<Photo>();
    this.modalService.show(PhotoModalComponent, {
      initialState: {
        photo: photo
      },
      class: 'modal-xl',
      ignoreBackdropClick: true
    }).content.subject = subject
    return subject
  }

  ngOnDestroy() {
    if (this._subscription) this._subscription.unsubscribe()
  }

}
