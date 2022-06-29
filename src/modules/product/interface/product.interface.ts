import { Document } from 'mongoose';
import { Category } from 'src/modules/categories/interface/category.interface';

export interface Product extends Document {
  name: string;
  price: string;
  description: string;
  banner: string;

  category_id: Category;
}
