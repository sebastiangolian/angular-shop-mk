import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketEventProductComponent } from './basket-event-product.component';

describe('BasketEventProductComponent', () => {
  let component: BasketEventProductComponent;
  let fixture: ComponentFixture<BasketEventProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketEventProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketEventProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
