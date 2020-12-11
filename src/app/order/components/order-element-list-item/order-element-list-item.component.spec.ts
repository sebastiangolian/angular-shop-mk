import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderElementListItemComponent } from './order-element-list-item.component';


describe('OrderElementListItemComponent', () => {
  let component: OrderElementListItemComponent;
  let fixture: ComponentFixture<OrderElementListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderElementListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderElementListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
