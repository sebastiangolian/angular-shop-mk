import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPhotoListItemComponent } from './event-photo-list-item.component';

describe('EventPhotoListItemComponent', () => {
  let component: EventPhotoListItemComponent;
  let fixture: ComponentFixture<EventPhotoListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventPhotoListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPhotoListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
