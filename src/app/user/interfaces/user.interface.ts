import { UserType } from './../enums/user-type.enum';
export interface User {
  login: string 
  password?: string
  firstName: string
  lastName: string
  type: UserType
}