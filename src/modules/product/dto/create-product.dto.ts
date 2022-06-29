import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/modules/categories/interface/category.interface';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  price: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  category_id: Category;
}
