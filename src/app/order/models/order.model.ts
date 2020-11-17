import { Order } from '../interfaces/order.interface'

export class OrderModel implements Order {
	firstname: string
    lastname: string
    phone: string
    email: string
    emailConfirm: string
    comment: string
    agreements: string[]
    paymentMethod: string
}