import { ApiError } from './api-error.interface';

export interface ApiList<T> {
    items: T[];
    total: number;
    messages: ApiError;
}
