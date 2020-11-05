import { Auth } from '../interfaces/auth.interface'

export class AuthModel implements Auth {
  login: string = ""
  password: string = ""
}