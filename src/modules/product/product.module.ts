import { Module } from '@nestjs/common';
import { ProductService } from './service/product.service';
import { ProductController } from './controller/product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/products.schema';
import { CategoriesModule } from '../categories/categories.module';
import { CategorySchema } from '../categories/schema/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
    CategoriesModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
