import PostgreDAO from '../../dao/postgre.dao';
import { language } from '../../constants/language';

import { ProductUpdateAttributes } from '../types';

export async function update(data: ProductUpdateAttributes) {
  try {
    const postgreDAOInstance = await PostgreDAO.getInstance();
    const result = await postgreDAOInstance.updateTable<ProductUpdateAttributes>(
      'products',
      data,
      { id: data.id }
    )
    if (result > 0) {
      return true;
    }
    throw new Error(language().productNotUpdated);
  } catch (err) {
    throw err;
  }
}