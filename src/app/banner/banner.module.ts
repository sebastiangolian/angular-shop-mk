import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerWidgetComponent } from './components/banner-widget/banner-widget.component';

@NgModule({
  declarations: [
    BannerWidgetComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BannerWidgetComponent
  ]
})
export class BannerModule { }
