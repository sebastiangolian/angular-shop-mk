import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { Offer } from '../../interfaces/offer.interface';

@Component({
  selector: 'offer-list-item',
  templateUrl: './offer-list-item.component.html',
  styleUrls: ['./offer-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfferListItemComponent implements OnInit {

  @Input() offer: Offer 
  @Input() photo: Photo 
  iconClass: string = ''
  
  constructor() { }

  ngOnInit(): void {}

  isOpenChange(status: boolean) {
    if(status) {
      this.iconClass = 'rotate-180'
    } else {
      this.iconClass = 'rotate-0'
    }
  }

}
