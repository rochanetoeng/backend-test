import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/modules/categories/interface/category.interface';
import { CategoriesService } from 'src/modules/categories/service/categories.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../interface/product.interface';

@Injectable()
export class ProductService {
  //INJEÇÃO DE DEPENDECIA
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly categoriesService: CategoriesService,
  ) {}

  // CRIAR PRODUTO
  async create(createProductDto: CreateProductDto) {
    const { name } = createProductDto;

    // VERIFICAR SE PRODUTO EXISTE NO BANCO
    const productAlreadyExists = await this.productModel.findOne({ name });
    if (productAlreadyExists)
      throw new BadRequestException(
        `O produto: "${name.toUpperCase()}" já existe`,
      );

    //CRIAR UM PRODUTO
    const newProduct = new this.productModel(createProductDto);

    // VERIFICAR SE ID DA CATEGORIA EXISTE
    const categoryExists = await this.categoriesService.findOne(
      newProduct.category_id,
    );

    if (!categoryExists)
      throw new BadRequestException(`A categoria não existe`);

    // ATRIBUIR CATEGORIA AO PRODUTO SALVAR NA COLLECTION PRODUCTS
    await newProduct.save();

    //ATRIBUIR PRODUTO NO BANCO DE CATEGORIAS
    try {
      await this.categoryModel.findByIdAndUpdate(categoryExists, {
        $addToSet: { products: newProduct },
      });
    } catch (error) {
      console.log('NÃO FOI POSSIVEL SALVAR');
    }

    return newProduct;
  }

  //LOCALIZAR PRODUTOS DE UMA CATEGORIA
  async findProductCategory(param: string) {
    const idCategory = param['idCategory'];

    // VERIFICAR SE ID DA CATEGORIA EXISTE
    const categoryExists = await this.categoriesService.findOne(idCategory);

    if (!categoryExists)
      throw new BadRequestException(`A categoria não existe`);

    return categoryExists.products;
  }

  async findOneProduct(_id: any) {
    const productExists = await this.productModel.findById(_id);

    if (!productExists) throw new BadRequestException('O Produto não existe');

    return productExists;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
