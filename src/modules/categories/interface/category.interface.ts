import { Document } from 'mongoose';
import { Product } from 'src/modules/product/interface/product.interface';

export interface Category extends Document {
  name: string;
  products: Product[];
}
