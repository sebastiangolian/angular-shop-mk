export interface OrderPayment {
    idOrderPayment: string;
    isProgress: boolean;
    canStartNewPayment: boolean;
    status: string;
    operatorUrl: string;
}
