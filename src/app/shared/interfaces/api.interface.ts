import { ApiBussinesLogic } from './api-bussines-logic.interface';

export interface Api<T> {
    item: T;    
    businessLogic: ApiBussinesLogic[]
}