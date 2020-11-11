import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableComponent } from './components/datatable/datatable.component';
import { DatatableSearchComponent } from './components/datatable/datatable-search.component';
import { InputFocusDirective } from './directives/input-focus.directive';
import { BooleanPipe } from './pipes/boolean.pipe';
import { MessagesComponent } from './components/messages/messages.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { FormsModule } from '@angular/forms';
import { PadPipe } from './pipes/pad.pipe';
import { AdblockDetectComponent } from './components/adblock-detect/adblock-detect.component';
import { InfoModalComponent } from './components/info-modal/info-modal.component';
import { AdblockDetectBannerComponent } from './components/adblock-detect-banner/adblock-detect-banner.component';
import { IconBComponent } from './components/icon-b/icon-b.component';
import { HtmlPipe } from './pipes/html.pipe';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { LazyLoadImageDirective } from './directives/lazy-load-image.directive';
import { NumberOfItemsComponent } from './components/number-of-items/number-of-items.component';

@NgModule({
  declarations: [
    DatatableComponent,
    DatatableSearchComponent,
    MessagesComponent,
    InputFocusDirective,
    LazyLoadImageDirective,
    BooleanPipe,
    ModalConfirmComponent,
    PadPipe,
    AdblockDetectComponent,
    InfoModalComponent,
    AdblockDetectBannerComponent,
    IconBComponent,
    HtmlPipe,
    ScrollToTopComponent,
    NumberOfItemsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    DatatableComponent,
    DatatableSearchComponent,
    MessagesComponent,
    InputFocusDirective,
    BooleanPipe,
    PadPipe,
    HtmlPipe,
    AdblockDetectComponent,
    InfoModalComponent,
    AdblockDetectBannerComponent,
    IconBComponent,
    ScrollToTopComponent,
    LazyLoadImageDirective,
    NumberOfItemsComponent
  ]
})
export class SharedModule { }
