import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoComponent } from './pages/photo/photo.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoListItemComponent } from './components/photo-list-item/photo-list-item.component';


@NgModule({
  declarations: [
    PhotoComponent, 
    PhotoListComponent, 
    PhotoListItemComponent],
  imports: [
    CommonModule,
    PhotoRoutingModule
  ],
  exports: [
    PhotoListComponent,
    PhotoListItemComponent
  ]
})
export class PhotoModule { }
