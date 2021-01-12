import { MessageType } from './../enums/message-type.enum';
export interface Message {
    text: string;
    type: MessageType;
    dismissible: boolean;
    timeout: number;
    datetime?: string;
}
