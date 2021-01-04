import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Photo } from '../../interfaces/photo.interface';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'photo-list-item',
  templateUrl: './photo-list-item.component.html',
  styleUrls: ['./photo-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListItemComponent implements OnInit {

  @Input() item: Photo;
  @Output() itemSelected: EventEmitter<Photo> = new EventEmitter<Photo>();
  active = false;
  src!: string

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.src = this.photoService.getFileUrl(this.item);
  }

  onClick() {
    this.itemSelected.emit(this.item);
  }
}
