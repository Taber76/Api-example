import PostgreDAO from '../../dao/postgre.dao';
import { language } from '../../constants/language';

import { UserUpdateAttributes } from '../types';

export async function update(userData: UserUpdateAttributes) {
  try {
    const postgreDAOInstance = await PostgreDAO.getInstance();
    const usersUpdated = await postgreDAOInstance.updateTable<UserUpdateAttributes>(
      'users',
      userData,
      { id: userData.id }
    )
    if (usersUpdated > 0) {
      return true;
    }
    throw new Error(language().userNotUpdated);
  } catch (err) {
    throw err;
  }
}