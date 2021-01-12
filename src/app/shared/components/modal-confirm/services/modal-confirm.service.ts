import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmComponent } from '../modal-confirm.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalConfirmService {

  constructor(private modalService: BsModalService) { }

  public confirm(content: string): Observable<boolean> {
    const subject = new Subject<boolean>();
    const modal = this.modalService.show(ModalConfirmComponent, {
      initialState: {
        content,
      },
      class: 'modal-sm'
    });
    if (modal.content) { modal.content.subject = subject; }
    return subject.asObservable();
  }
}
