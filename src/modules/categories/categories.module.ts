import { Module } from '@nestjs/common';
import { CategoriesService } from './service/categories.service';
import { CategoriesController } from './controller/categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './schema/categories.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: CategorySchema,
      },
    ]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
