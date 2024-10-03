export interface ProductAttributes {
  id: string;
  name: string;
  code: string;
  description: string;
  category: string;
  active: boolean;
}

export interface ProductCreationAttributes
  extends Omit<ProductAttributes, 'id' | 'code' | 'category'> {
}

export interface ProductUpdateAttributes
  extends Partial<ProductAttributes> {
}
