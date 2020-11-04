import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalConfirmComponent implements OnInit {

  content: string
  subject: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {}

  action(value: boolean) {
    this.bsModalRef.hide();
    this.subject.next(value);
    this.subject.complete();
  }
}
