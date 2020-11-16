import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BasketItem } from '../interfaces/basket-item.interface';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  subjectItems: BehaviorSubject<BasketItem[]> = new BehaviorSubject<BasketItem[]>([]);
  subjectSumPrice: BehaviorSubject<number> = new BehaviorSubject<number>(null);
  subjectSumAmount: BehaviorSubject<number> = new BehaviorSubject<number>(null);
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
    this.subjectSumPrice.next(this.calculateSumPrice())
    this.subjectSumAmount.next(this.calculateSumAmount())
    this.saveStorage()
  }

  calculateSumPrice(): number {
    let ret = 0
    this.items.forEach((item) => {
      ret += item.amount * item.price
    })
    return ret
  }

  calculateSumAmount(): number {
    let ret = 0
    this.items.forEach((item) => {
      ret += item.amount
    })
    return ret
  }

  clear(): void {
    this.items = []
    this.subjectItems.next([])
    this.subjectSumPrice.next(-1)
    this.subjectSumAmount.next(-1)
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
      this.subjectSumPrice.next(this.calculateSumPrice())
      this.subjectSumAmount.next(this.calculateSumAmount())
    } else {
      this.items = []
      this.subjectSumPrice.next(-1)
      this.subjectSumAmount.next(-1)
    }
  }
}
