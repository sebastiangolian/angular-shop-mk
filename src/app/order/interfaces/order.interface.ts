import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { OrderAgreement } from './order-agreement.interface';
import { OrderPaymentMethod } from './order-payment-method.interface';

export interface Order {
    idOrder?: string
    firstname: string
    lastname: string
    phone: string
    email: string
    emailConfirm: string
    comment: string
    agreements: OrderAgreement[]
    paymentMethod: OrderPaymentMethod[]
    items: BasketItem[]
}