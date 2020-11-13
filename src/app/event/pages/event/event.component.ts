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
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, OnDestroy {

  events$: Observable<Event[]>
  photos$: Observable<Photo[]>
  photos: Photo[]
  idEvent: string = null
  private _subscription: Subscription = new Subscription();

  constructor(private eventService: EventService, private photoService: PhotoService, private modalService: BsModalService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this._subscription.add(this.getPhotosByRouterId())
    this.events$ = this.getEvents()
  }

  onEventSelected(event: Event) {
    this.router.navigate(['event/', event.idEvent])
  }

  onPhotoSelected(photo: Photo) {
    this._subscription.add(this.photoModal(photo).subscribe())
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
      map((photos: ApiList<Photo>) => {
        this.photos = photos.items
        return photos.items
      })
    )
  }

  private getPhotosByRouterId(): Subscription {
    return this.route.url.
      subscribe((segement: UrlSegment[]) => {
        if(segement.length > 0) {
          this.idEvent = segement[0].path
          this.photos$ = this.getPhotos(this.idEvent)
        }
      })
  }

  private photoModal(photo: Photo): Observable<Photo> {
    const subject = new Subject<Photo>();
    this.modalService.show(PhotoModalComponent, {
      initialState: {
        photo: photo,
        photos: this.photos,
        currentIndex: this.photos.findIndex(result => result.idPhoto == photo.idPhoto)
      },
      class: 'modal-xl pt-4',
      ignoreBackdropClick: true
    }).content.subject = subject
    return subject
  }

  ngOnDestroy() {
    if (this._subscription) this._subscription.unsubscribe()
  }

}
