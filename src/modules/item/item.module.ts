import { Module } from '@nestjs/common';
import { ItemService } from './service/item.service';
import { ItemController } from './controller/item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema } from './schema/intem.schema';
import { ProductModule } from '../product/product.module';
import { OrderModule } from '../order/order.module';
import { OrderSchema } from '../order/schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Item',
        schema: ItemSchema,
      },
      {
        name: 'Order',
        schema: OrderSchema,
      },
    ]),
    ProductModule,
    OrderModule,
  ],
  controllers: [ItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
