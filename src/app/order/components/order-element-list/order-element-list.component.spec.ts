import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderElementListComponent } from './order-element-list.component';


describe('OrderElementListComponent', () => {
  let component: OrderElementListComponent;
  let fixture: ComponentFixture<OrderElementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderElementListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderElementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
