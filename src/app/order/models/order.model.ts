import { OrderPayment } from '../interfaces/order-payment.interface';
import { BasketItem } from 'src/app/basket/interfaces/basket-item.interface';
import { OrderAgreement } from '../interfaces/order-agreement.interface';
import { OrderDeliveryMethod } from '../interfaces/order-delivery-method.interface';
import { Order } from '../interfaces/order.interface';
import { OrderPaymentMethod } from '../interfaces/order-payment-method.interface';

export class OrderModel implements Order {
    idOrder?: string;
    firstname: string;
    lastname: string;
    phone?: string;
    email: string;
    emailConfirm: string;
    comment?: string;
    orderDate?: string;
    agreements: OrderAgreement[];
    deliveryMethod: OrderDeliveryMethod;
    paymentMethod: OrderPaymentMethod;
    payment: OrderPayment;
    items: BasketItem[];
}
