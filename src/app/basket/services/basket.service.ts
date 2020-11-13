import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasketItem } from '../interfaces/basket-item.interface';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  subjectItems: BehaviorSubject<BasketItem[]> = new BehaviorSubject<BasketItem[]>([]);
  subjectSum: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  items: BasketItem[] = []
  constructor() { 
    this.subjectSum.next(-1)
  }

  update(item: BasketItem): void {
    let itemIndex: number = this.findIndex(item)
    if(itemIndex > -1) {
      this.items[itemIndex] = item
    } else {
      this.items.push(item)
    }
    this.subjectItems.next(this.items);
    this.subjectSum.next(this.calculateSum())
  }

  calculateSum(): number {
    let ret = 0
    this.items.forEach((item)=> {
      ret += item.amount * item.price
    })
    return ret
  }

  private findIndex(item: BasketItem): number {
    return this.items.findIndex((value)=> item.idProduct == value.idProduct && item.idPhoto == value.idPhoto)
  }
}
