import { Photo } from 'src/app/photo/interfaces/photo.interface';

export interface BasketItem {
    idPhoto: string
    idProduct: string
    amount: number
    price: number
    photo: Photo
}
