import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';
import { Event } from '../../interfaces/event.interface';
import { ApiList } from 'src/app/shared/interfaces/api-list.interface';
import { map, tap } from 'rxjs/operators';
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

  events$: Observable<Event[]>;
  photos$: Observable<Photo[]>;
  photos: Photo[];
  idEvent: string = null;
  event$: Observable<Event>;
  event: Event;
  isEventList: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private eventService: EventService, private photoService: PhotoService, private modalService: BsModalService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscription.add(this.getPhotosByRouterId());
    this.events$ = this.eventService.get();
  }

  onEventSelected(event: Event) {
    this.router.navigate(['event/', event.idEvent]);
  }

  onPhotoSelected(photo: Photo) {
    this.subscription.add(this.photoModal(photo).subscribe());
  }

  private getPhotos(idEvent: string): Observable<Photo[]> {
    const filters = { idEvent };
    return this.photoService.get(0, 0, null, null, filters).pipe(
      tap(photos => this.photos = photos)
    );
  }

  private getPhotosByRouterId(): Subscription {
    return this.route.url.
      subscribe((segement: UrlSegment[]) => {
        if (segement.length > 0) {
          this.isEventList = true
          this.idEvent = segement[0].path;
          this.event$ = this.eventService.getById(this.idEvent).pipe(
            tap(event => this.event = event)
          );
          this.photos$ = this.getPhotos(this.idEvent);
        } else {
          this.isEventList = false
        }
      });
  }

  private photoModal(photo: Photo): Observable<Photo> {
    const subject = new Subject<Photo>();
    this.modalService.show(PhotoModalComponent, {
      initialState: {
        event: this.event,
        photo,
        photos: this.photos,
        currentIndex: this.photos.findIndex(result => result.idPhoto === photo.idPhoto)
      },
      class: 'modal-xl pt-4',
      ignoreBackdropClick: true
    }).content.subject = subject;
    return subject;
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe(); }
  }

}
