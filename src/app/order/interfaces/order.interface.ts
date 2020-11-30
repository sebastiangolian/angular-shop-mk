import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { OrderAgreement } from './order-agreement.interface';
import { OrderDeliveryMethod } from './order-delivery-method.interface';
import { OrderPaymentMethod } from './order-payment-method.interface';

export interface Order {
    idOrder?: string
    status?: string
    isPaid?: boolean
    firstname: string
    lastname: string
    phone: string
    email: string
    comment: string
    agreements: OrderAgreement[]
    deliveryMethod?: OrderDeliveryMethod
    paymentMethod: OrderPaymentMethod
    items: BasketItem[]
}
