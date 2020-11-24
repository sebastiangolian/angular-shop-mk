import { OrderAgreement } from '../interfaces/order-agreement.interface'
import { OrderLabel } from '../interfaces/order-label.interface'
import { OrderPaymentMethod } from '../interfaces/order-payment-method.interface'
import { Order } from '../interfaces/order.interface'

export class OrderModel implements Order {
    firstname: string
    lastname: string
    phone: string
    email: string
    emailConfirm: string
    comment: string
    labels: OrderLabel
    agreements: OrderAgreement[]
    paymentMethod: OrderPaymentMethod[]
}