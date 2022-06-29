import { Module } from '@nestjs/common';
import { OrderService } from './service/order.service';
import { OrderController } from './controller/order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Order',
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
