import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Photo } from '../../interfaces/photo.interface';

@Component({
  selector: 'photo-modal-image',
  templateUrl: './photo-modal-image.component.html',
  styleUrls: ['./photo-modal-image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhotoModalImageComponent {

  @Input() photo: Photo;
  @Input() src: string;
  constructor() { }
}
