import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../interface/category.interface';

@Injectable()
export class CategoriesService {
  //INJEÇÃO DE DEPENDENCIA
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  //CREATE CATEGORY
  async create(createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;

    const categoryAlreadyExists = await this.categoryModel.findOne({ name });

    if (categoryAlreadyExists)
      throw new BadRequestException(`A categoria: "${name}"já existe`);

    const newCategory = new this.categoryModel(createCategoryDto);
    await newCategory.save();

    return {
      _id: newCategory._id,
      name: newCategory.name,
    };
  }

  //FIND CATEGORY
  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find().populate('products');
  }

  //FIND CATEGORY BY NAME
  async findOne(_id: any): Promise<Category> {
    return await this.categoryModel.findById(_id).populate('products');
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
