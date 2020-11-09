import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoComponent } from './pages/photo/photo.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoListItemComponent } from './components/photo-list-item/photo-list-item.component';
import { SharedModule } from '../shared/shared.module';
import { PhotoModalComponent } from './components/photo-modal/photo-modal.component';
import { PhotoModalImageComponent } from './components/photo-modal-image/photo-modal-image.component';
import { OfferModule } from '../offer/offer.module';


@NgModule({
  declarations: [
    PhotoComponent, 
    PhotoListComponent, 
    PhotoListItemComponent,
    PhotoModalComponent,
    PhotoModalImageComponent
  ],
  imports: [
    CommonModule,
    PhotoRoutingModule,
    OfferModule,
    SharedModule
  ],
  exports: [
    PhotoListComponent,
    PhotoListItemComponent,
    PhotoModalComponent
  ]
})
export class PhotoModule { }
