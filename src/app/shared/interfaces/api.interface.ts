import { ApiMessage } from "./api-message.interface";

export interface Api<T> {
    item: T;
    messages: ApiMessage[];
}
