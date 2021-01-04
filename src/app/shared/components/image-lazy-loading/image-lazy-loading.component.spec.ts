import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageLazyLoadingComponent } from './image-lazy-loading.component';

describe('ImageLazyLoadingComponent', () => {
  let component: ImageLazyLoadingComponent;
  let fixture: ComponentFixture<ImageLazyLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageLazyLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageLazyLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
