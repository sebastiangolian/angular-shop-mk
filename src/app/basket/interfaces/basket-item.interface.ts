import { Event } from 'src/app/event/interfaces/event.interface';
import { Photo } from 'src/app/photo/interfaces/photo.interface';
import { Product } from 'src/app/product/interfaces/product.interface';

export interface BasketItem {
    amount: number
    price: number
    photo: Photo
    product: Product
    event: Event
}
