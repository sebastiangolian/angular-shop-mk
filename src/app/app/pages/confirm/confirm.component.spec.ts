import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { PageConfirmComponent } from './confirm.component';
import { EnkiCheckboxComponent } from '../../components/enki-checkbox/enki-checkbox.component';

describe('PageConfirmComponent', () => {
  let component: PageConfirmComponent;
  let fixture: ComponentFixture<PageConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PageConfirmComponent,
        EnkiCheckboxComponent
      ],
      imports: [
        RouterTestingModule,
        ModalModule.forRoot()
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
