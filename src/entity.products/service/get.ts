import PostgreDAO from '../../dao/postgre.dao';
import { ProductAttributes } from '../types';


export async function get(id: string | null) {
  try {
    const postgreDAOInstance = await PostgreDAO.getInstance();
    const whereQuery: any = { active: true };
    const selectQuery: (keyof ProductAttributes)[] = ['id', 'name', 'code', 'description', 'category', 'active'];
    if (id) whereQuery['id'] = id;

    const result = await postgreDAOInstance.getFromTable<ProductAttributes>(
      "products",
      whereQuery,
      selectQuery
    );

    return result
  } catch (err) {
    throw err;
  }
}