import { DateTimeHelper } from './../helpers/date-time.helper';
import { Message } from 'src/app/shared/interfaces/message.interface';
import { environment } from 'src/environments/environment';
import { MessageType } from '../enums/message-type.enum';
export class MessageModel implements Message {
    text = '';
    type: MessageType = MessageType.SUCCESS;
    dismissible: boolean = environment.messageDismissible;
    timeout = 0;
    datetime: string = DateTimeHelper.currentDateTime();

    setTimeoutByType(timeout: number = this.timeout): void {
        if (timeout === 0) {
            switch (this.type) {
                case MessageType.SUCCESS: {
                    this.timeout = environment.messageSuccessTimeout;
                    break;
                }
                case MessageType.INFO: {
                    this.timeout = environment.messageInfoTimeout;
                    break;
                }
                default: {
                    this.timeout = environment.messageAnotherTimeout;
                    break;
                }
            }
        }
    }
}
