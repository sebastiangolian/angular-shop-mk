import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalConfirmComponent implements OnInit {

  content = '';
  subject: Subject<boolean> = new Subject();

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {}

  action(value: boolean): void {
    this.bsModalRef.hide();
    this.subject.next(value);
    this.subject.complete();
  }
}
