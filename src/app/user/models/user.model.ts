import { UserType } from './../enums/user-type.enum';
import { User } from '../interfaces/user.interface'

export class UserModel implements User {
  login: string = ""
  password?: string = ""
  firstName: string = ""
  lastName: string = ""
  type: UserType = UserType.INDIVIDUAL
  isIndividual?: boolean = false
}