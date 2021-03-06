import { OrderAgreement } from './order-agreement.interface';
import { OrderDeliveryMethod } from './order-delivery-method.interface';
import { OrderLabel } from './order-label.interface';
import { OrderPaymentMethod } from './order-payment-method.interface';

export interface OrderDefinition {
    firstname?: string;
    lastname?: string;
    phone?: string;
    email?: string;
    emailConfirm?: string;
    comment: string;
    labels: OrderLabel;
    agreements: OrderAgreement[];
    deliveryMethods: OrderDeliveryMethod[];
    paymentMethods: OrderPaymentMethod[];
}
