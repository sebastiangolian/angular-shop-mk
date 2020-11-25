import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BasketListItemComponent } from './basket-list-item.component';

describe('BasketListItemComponent', () => {
  let component: BasketListItemComponent;
  let fixture: ComponentFixture<BasketListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasketListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasketListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
