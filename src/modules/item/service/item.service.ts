import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/modules/order/interface/order.interface';
import { OrderService } from 'src/modules/order/service/order.service';
import { ProductService } from 'src/modules/product/service/product.service';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { Item } from '../interface/item.interface';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel('Item') private readonly itemModel: Model<Item>,
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
  ) {}

  async create(createItemDto: CreateItemDto) {
    const productExists = await this.productService.findOneProduct(
      createItemDto.product_id,
    );

    const orderExists = await this.orderService.findOneOrder(
      createItemDto.order_id,
    );
    console.log(productExists);
    console.log(orderExists);

    const newItem = new this.itemModel(createItemDto);

    await newItem.save();

    try {
      await this.orderModel.findByIdAndUpdate(orderExists, {
        $push: { itens: newItem },
      });
    } catch (error) {
      throw new BadRequestException('NAO FOI POSSIVEL SALVAR ITEM NA ORDEM');
    }

    return newItem;
  }

  findAll() {
    return `This action returns all item`;
  }

  findorderDatails(_id: string) {
    return;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async remove(_id: string) {
    const itemExist = await this.itemModel.findById(_id);
    if (!itemExist) throw new BadRequestException('O item não existe');

    const orderId = itemExist.order_id;

    try {
      await this.itemModel.findByIdAndDelete(itemExist);
      await this.orderModel.findByIdAndUpdate(orderId, {
        $pull: { itens: itemExist._id },
      });
    } catch (error) {}

    return;
  }
}
