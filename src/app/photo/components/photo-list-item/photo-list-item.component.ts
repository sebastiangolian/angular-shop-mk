import { PhotoService } from 'src/app/photo/services/photo.service';
import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../../interfaces/photo.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'photo-list-item',
  templateUrl: './photo-list-item.component.html',
  styleUrls: ['./photo-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoListItemComponent implements OnInit {

  @Input() item: Photo;
  @Output() itemSelected: EventEmitter<Photo> = new EventEmitter<Photo>();
  active: boolean = false
  src$: Observable<string>

  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.src$ = this.photoService.getFile(this.item).pipe(
      map(api => api.body)
    )
  }

  onClick() {
    this.itemSelected.emit(this.item)
  }
}
