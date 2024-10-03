import PostgreDAO from '../../dao/postgre.dao.js';
import { UserAttributes } from '../types.js';


export async function get(user_id: number | null) {
  try {
    const postgreDAOInstance = await PostgreDAO.getInstance();
    const whereQuery: any = {};
    const selectQuery: (keyof UserAttributes)[] = ['id', 'username', 'fullname', 'role', 'active'];
    if (user_id) whereQuery['id'] = user_id;

    const result = await postgreDAOInstance.getFromTable<UserAttributes>(
      "users",
      whereQuery,
      selectQuery
    );

    return result
  } catch (err) {
    throw err;
  }
}