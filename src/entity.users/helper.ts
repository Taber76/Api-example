import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserAttributes } from './types';


export class UserHelper {
  private constructor() { }

  public static comparePassword(password: string, savedPassword: string) {
    return bcrypt.compareSync(password, savedPassword);
  }

  public static generateToken(user: UserAttributes) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    return token;
  }


}