import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Order } from 'src/modules/order/interface/order.interface';
import { Product } from 'src/modules/product/interface/product.interface';

export class CreateItemDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  order_id: Order;

  @IsNotEmpty()
  @IsString()
  product_id: Product;
}
