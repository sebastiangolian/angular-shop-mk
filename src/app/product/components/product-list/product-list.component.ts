import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {

  @Input() products: Product[]
  constructor() { }

  ngOnInit(): void {
  }

}
