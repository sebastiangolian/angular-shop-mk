import { OrderPayment } from './../interfaces/order-payment.interface';

export class OrderPaymentModel implements OrderPayment {
    idOrderPayment: string
    isProgress: boolean = false
    status: string = null
    operatorUrl: string = null
}