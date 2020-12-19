import { Observable } from 'rxjs';
import { PhotoService } from 'src/app/photo/services/photo.service';
import { Component, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { Photo } from '../../interfaces/photo.interface';

@Component({
  selector: 'photo-modal-image',
  templateUrl: './photo-modal-image.component.html',
  styleUrls: ['./photo-modal-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoModalImageComponent implements OnChanges {

  @Input() photo: Photo;
  src$: Observable<string>;
  constructor(private photoService: PhotoService) { }

  ngOnChanges(): void {
    this.src$ = this.photoService.getFile(this.photo);
  }

}
