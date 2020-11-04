import { ApiBussinesLogic } from './api-bussines-logic.interface';

export interface ApiList<T> {
    items: T[];
    total: number;
    bussinesLogic: ApiBussinesLogic[];
}