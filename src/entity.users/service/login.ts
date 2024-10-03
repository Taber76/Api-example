import PostgreDAO from '../../dao/postgre.dao';
import MemoryStorage from "../../storage/memory.storage";
import { language } from '../../constants/language';

import { UserAttributes, UserCredentialsAttributes } from "../types";
import { UserHelper } from '../helper';

export async function login(user: UserCredentialsAttributes) {
  try {
    const remainingLoginAttempts = MemoryStorage.addLoginAttempt(user.username);
    if (remainingLoginAttempts === -1) {
      throw new Error(language().manyAttempts);
    }
    const postgreDAOInstance = await PostgreDAO.getInstance();

    const result = await postgreDAOInstance.getFromTable<UserAttributes>(
      "users",
      { username: user.username, active: true }
    );
    if (result.length === 0) throw new Error(language().incorrectCredentials + remainingLoginAttempts);

    const passwordMatch = UserHelper.comparePassword(
      user.password,
      result[0].password
    );
    if (!passwordMatch) throw new Error(language().incorrectCredentials + remainingLoginAttempts);

    MemoryStorage.deleteLoginAttempts(user.username);
    const token = UserHelper.generateToken(result[0]);

    return { userData: { ...result[0], password: null }, token };
  } catch (err) {
    throw err;
  }
}