import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { PhotoService } from 'src/app/photo/services/photo.service';
import { Event } from '../../interfaces/event.interface';

@Component({
  selector: 'event-photo-list-item',
  templateUrl: './event-photo-list-item.component.html',
  styleUrls: ['./event-photo-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventPhotoListItemComponent implements OnInit {

  @Input() event: Event;
  active = false;
  src: string;
  cardTextWidth: number = 50
  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.src = this.photoService.getFileUrl(this.event.titlePhoto);
    if (this.event.titlePhoto.width > this.event.titlePhoto.height) {
      this.cardTextWidth = 25
    } else {
      this.cardTextWidth = 43
    }
  }

}
