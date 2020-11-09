import { Product } from 'src/app/product/interfaces/product.interface';

export interface Offer {
  idOffer: string
  name: string
  products? : Product[]
}