import { UserType } from './../enums/user-type.enum';
import { User } from '../interfaces/user.interface';

export class UserModel implements User {
  login = '';
  password = '';
  firstName = '';
  lastName = '';
  type: UserType = UserType.INDIVIDUAL;
  isIndividual = false;
}
