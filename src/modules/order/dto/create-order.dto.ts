import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsNumber()
  table: number;

  @IsOptional()
  @IsString()
  name: string;
}
