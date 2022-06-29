import { Document } from 'mongoose';
import { Item } from 'src/modules/item/interface/item.interface';

export interface Order extends Document {
  table: number;
  status: boolean;
  draft: boolean;
  name?: string;
  itens: Item[];
}
