import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasketItem } from '../interfaces/basket-item.interface';
import { BasketSummary } from '../interfaces/basket-summary';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  subjectItems: BehaviorSubject<BasketItem[]> = new BehaviorSubject<BasketItem[]>([]);
  subjectSummary: BehaviorSubject<BasketSummary> = new BehaviorSubject<BasketSummary>(null);
  items: BasketItem[] = []
  constructor() {
    this.loadStorage()
  }

  update(item: BasketItem): void {
    let itemIndex: number = this.findIndex(item)
    if (itemIndex > -1) {
      this.items[itemIndex] = item
    } else {
      this.items.push(item)
    }
    this.subjectItems.next(this.items);
    this.subjectSummary.next(this.calculate())
    this.saveStorage()
  }

  delete(basketItem: BasketItem): void {
    this.items = this.items.filter(item => item !== basketItem)
    this.subjectItems.next(this.items);
    this.subjectSummary.next(this.calculate())
    this.saveStorage()
  }

  calculate(): BasketSummary {
    let sumPrice = 0
    let sumAmount = 0 
    this.items.forEach((item) => {
      sumAmount += item.amount
      sumPrice += item.amount * item.price
    })
    return {"sumPrice":sumPrice, "sumAmount": sumAmount}
  }

  clear(): void {
    this.items = []
    this.subjectItems.next([])
    this.subjectSummary.next(null)
    localStorage.removeItem('basket')
  }

  private findIndex(item: BasketItem): number {
    return this.items.findIndex((value) => item.product.idProduct == value.product.idProduct && item.photo.idPhoto == value.photo.idPhoto)
  }

  private saveStorage(): void {
    localStorage.setItem('basket', JSON.stringify(this.items))
  }

  private loadStorage(): void {
    let storageBasket = localStorage.getItem('basket')
    if (storageBasket != null) {
      this.items = JSON.parse(storageBasket)
      this.subjectItems.next(this.items)
      this.subjectSummary.next(this.calculate())
    } else {
      this.items = []
      this.subjectItems.next(this.items)
      this.subjectSummary.next(null)
    }
  }
}
