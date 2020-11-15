import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketEventPhotoComponent } from './basket-event-photo.component';

describe('BasketEventPhotoComponent', () => {
  let component: BasketEventPhotoComponent;
  let fixture: ComponentFixture<BasketEventPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketEventPhotoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketEventPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
