import { ApiError } from './api-error.interface';

export interface Api<T> {
    item: T;    
    messages: ApiError
}