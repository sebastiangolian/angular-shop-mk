import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface'
import { OrderPaymentStatus } from '../interfaces/order-payment-status.interface'

export class OrderPaymentStatusModel implements OrderPaymentStatus {
    idOrder: string
    isProgress: boolean = false
    status: string = null
}