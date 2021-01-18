import { ApiMessage } from 'src/app/shared/interfaces/api-message.interface';

export interface ApiList<T> {
    items: T[];
    total: number;
    messages: ApiMessage[];
}
