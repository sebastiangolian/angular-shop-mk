import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketEventComponent } from './basket-event.component';

describe('BasketEventComponent', () => {
  let component: BasketEventComponent;
  let fixture: ComponentFixture<BasketEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
