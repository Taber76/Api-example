import * as bcrypt from 'bcrypt';

import { BCRYPT_ROUNDS } from '../config/environment.js';
import { UserRole } from './types.js';
import { language } from '../constants/language.js';

export default class DTO {
  private static salt = bcrypt.genSaltSync(BCRYPT_ROUNDS);
  private constructor() { }

  private static checkPassword(password: string) {
    //const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //return passwordRegex.test(password);
    return password.length >= 8
  }


  public static register(data: any, user: any) {
    let { fullname, username, password, role } = data;
    if (!fullname || !username || !password)
      return {
        error: {
          message: language().userRegisterAllFieldsRequired
        }
      }

    if (!this.checkPassword(password))
      return {
        error: {
          message: language().userRegisterInvalidPassword
        }
      }
    const hashPassword = bcrypt.hashSync(password, this.salt);

    if (role && !(role in UserRole)) {
      return {
        error: {
          message: language().userRegisterInvalidRole
        }
      }
    } else role = UserRole.VIEWER

    return {
      error: null, value: {
        fullname,
        username,
        password: hashPassword,
        role,
        active: user ? true : false
      }
    }
  }

  public static login(data: any) {
    const { username, password } = data;
    if (!username || !password)
      return {
        error: {
          message: language().userLoginAllFieldsRequired
        }
      }

    return {
      error: null,
      value: {
        username,
        password
      }
    }
  }


  public static update(data: any, user: any) {
    const { fullname, username, password, role, active } = data;
    if (!fullname && !username && !password && !role && !active || !user.id)
      return {
        error: {
          message: language().userUpdateAllFieldsRequired
        }
      }

    if (password && !this.checkPassword(password))
      return {
        error: {
          message: language().userRegisterInvalidPassword
        }
      }

    if (role && !(role in UserRole))
      return {
        error: {
          message: role + language().userNotAssingableRole
        }
      }

    const response: any = {
      id: parseInt(user.id as string),
      updatedAt: new Date()
    };
    if (fullname) response.fullname = fullname;
    if (username) response.username = username;
    if (password) response.password = bcrypt.hashSync(password, this.salt);
    if (role) response.role = role;
    if (active) response.active = active;

    return {
      error: null,
      value: response,
    };

  }


  public static getByToken(user: any) {
    const { id } = user

    if (!id) return {
      error: {
        message: language().userNotFound
      }
    }

    return {
      error: null,
      value: parseInt(id as string)
    }
  }

}