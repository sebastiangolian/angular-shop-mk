import { PhotoService } from 'src/app/photo/services/photo.service';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'order-element-list-item',
  templateUrl: './order-element-list-item.component.html',
  styleUrls: ['./order-element-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderElementListItemComponent implements OnInit {

  @Input() basketItems: BasketItem[]
  @Input() photo: Photo
  src$: Observable<string>
  constructor(private photoService: PhotoService) { }

  ngOnInit(): void {
    this.basketItems = this.basketItems.filter(item => item.photo.idPhoto == this.photo.idPhoto)
    this.src$ = this.photoService.getFile(this.photo).pipe(
      map(api => api.body)
    )
  }
}
