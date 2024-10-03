import PostgreDAO from '../../dao/postgre.dao';
import { language } from '../../constants/language';

import { ProductAttributes, ProductCreationAttributes } from '../types';

export async function register(data: ProductCreationAttributes) {
  try {
    const postgreDAOInstance = await PostgreDAO.getInstance();

    const result = await postgreDAOInstance.insertIntoTable<ProductCreationAttributes>(
      "products",
      data
    );
    if (!result) throw new Error(language().unableToCreateProduct);

    return { ...result[0] } as ProductAttributes
  } catch (err) {
    throw err;
  }
}