import { Document } from 'mongoose';
import { Order } from 'src/modules/order/interface/order.interface';
import { Product } from 'src/modules/product/interface/product.interface';

export interface Item extends Document {
  amount: number;
  order_id: Order;
  product_id: Product;
}
