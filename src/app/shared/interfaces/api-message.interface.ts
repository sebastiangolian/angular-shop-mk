import { ApiError } from './api-error.interface';
import { ApiNotification } from './api-notification.interface';

export interface ApiMessage {
    errors: ApiError[]
    notifications: ApiNotification[]
}
