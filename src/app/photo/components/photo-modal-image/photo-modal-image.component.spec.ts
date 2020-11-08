import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoModalImageComponent } from './photo-modal-image.component';

describe('PhotoModalImageComponent', () => {
  let component: PhotoModalImageComponent;
  let fixture: ComponentFixture<PhotoModalImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoModalImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoModalImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
