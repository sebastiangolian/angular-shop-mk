import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputFocusDirective } from './directives/input-focus.directive';
import { BooleanPipe } from './pipes/boolean.pipe';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { FormsModule } from '@angular/forms';
import { PadPipe } from './pipes/pad.pipe';
import { IconBComponent } from './components/icon-b/icon-b.component';
import { HtmlPipe } from './pipes/html.pipe';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { NumberOfItemsComponent } from './components/number-of-items/number-of-items.component';
import { SafePipe } from './pipes/safe.pipe';
import { IntersectionObserverDirective } from './directives/intersection-observer.directive';
import { LazyLoadingImageDirective } from './directives/lazy-loading-image.directive';
import { MessagesAlertComponent } from './components/messages-alert/messages-alert.component';
import { MessagesModalComponent } from './components/messages-modal/messages-modal.component';
import { ModalInfoComponent } from './components/modal-info/modal-info.component';

@NgModule({
  declarations: [
    //components
    IconBComponent,
    ModalInfoComponent,
    MessagesAlertComponent,
    MessagesModalComponent,
    ModalConfirmComponent,
    NumberOfItemsComponent,
    ScrollToTopComponent,
    //directives
    InputFocusDirective,
    IntersectionObserverDirective,
    LazyLoadingImageDirective,
    //pipes
    BooleanPipe,
    HtmlPipe,
    PadPipe,
    SafePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [
    //components
    IconBComponent,
    MessagesAlertComponent,
    MessagesModalComponent,
    ModalConfirmComponent,
    ModalInfoComponent,
    NumberOfItemsComponent,
    ScrollToTopComponent,
    //directives
    InputFocusDirective,
    IntersectionObserverDirective,
    LazyLoadingImageDirective,
    //pipes
    BooleanPipe,
    HtmlPipe,
    PadPipe,
    SafePipe
  ]
})
export class SharedModule { }
