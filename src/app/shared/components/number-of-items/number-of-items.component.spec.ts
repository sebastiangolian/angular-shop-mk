import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfItemsComponent } from './number-of-items.component';

describe('NumberOfItemsComponent', () => {
  let component: NumberOfItemsComponent;
  let fixture: ComponentFixture<NumberOfItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberOfItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
