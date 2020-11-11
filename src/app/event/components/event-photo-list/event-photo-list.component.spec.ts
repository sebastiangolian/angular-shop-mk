import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPhotoListComponent } from './event-photo-list.component';

describe('EventPhotoListComponent', () => {
  let component: EventPhotoListComponent;
  let fixture: ComponentFixture<EventPhotoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPhotoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPhotoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
