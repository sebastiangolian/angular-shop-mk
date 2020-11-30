import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface'
import { OrderAgreement } from '../interfaces/order-agreement.interface'
import { OrderDeliveryMethod } from '../interfaces/order-delivery-method.interface'
import { OrderPaymentMethod } from '../interfaces/order-payment-method.interface'
import { Order } from '../interfaces/order.interface'

export class OrderModel implements Order {
    idOrder?: string
    firstname: string
    lastname: string
    phone: string
    email: string
    emailConfirm: string
    comment: string
    agreements: OrderAgreement[]
    deliveryMethod: OrderDeliveryMethod
    paymentMethod: OrderPaymentMethod
    items: BasketItem[]
}