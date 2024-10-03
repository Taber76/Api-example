import PostgreDAO from '../../dao/postgre.dao';
import { language } from '../../constants/language';

import { UserAttributes, UserCreationAttributes } from '../types';

export async function register(user: UserCreationAttributes) {
  try {
    const postgreDAOInstance = await PostgreDAO.getInstance();

    const existingUser = await postgreDAOInstance.getFromTable<UserAttributes>(
      "users",
      { username: user.username }
    );
    if (existingUser.length > 0) throw new Error(language().userAlreadyExists);

    const registeredUser = await postgreDAOInstance.insertIntoTable<UserCreationAttributes>(
      "users",
      user
    );
    if (!registeredUser) throw new Error(language().unableToCreateUser);

    return { ...registeredUser[0], password: null } as UserAttributes
  } catch (err) {
    throw err;
  }
}