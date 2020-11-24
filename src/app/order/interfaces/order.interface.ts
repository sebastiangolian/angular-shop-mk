import { OrderAgreement } from './order-agreement.interface';
import { OrderLabel } from './order-label.interface';
import { OrderPaymentMethod } from './order-payment-method.interface';

export interface Order {
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
