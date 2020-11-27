import { User } from '../interfaces/user.interface'

export class UserModel implements User {
  login: string = ""
  password?: string = ""
  token?: string = ""
}