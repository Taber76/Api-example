import PostgreDAO from '../../dao/postgre.dao.js';
import { SessionOperatorsAttributes, UserAttributes } from '../types.js';


export async function getBySession(session_id: string) {
  try {
    const postgreDAOInstance = await PostgreDAO.getInstance();

    const operatorsIds = await postgreDAOInstance.getFromTable<SessionOperatorsAttributes>(
      "session_operators",
      { session_id },
      ['operator_id']
    );
    if (operatorsIds.length < 1) return [];

    const userPromises = operatorsIds.map(async operator => {
      const user = await postgreDAOInstance.getFromTable<UserAttributes>(
        "users",
        { id: operator.operator_id },
        ['id', 'username', 'fullname', 'role', 'active']
      )
      return user[0]
    });
    const users = await Promise.all(userPromises);

    return users
  } catch (err) {
    throw err;
  }
}