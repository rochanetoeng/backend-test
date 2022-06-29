import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../interface/order.interface';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  // CRIAR UMA ORDEM
  async createOrder(createOrderDto: CreateOrderDto) {
    const { table } = createOrderDto;

    const orderAlreadyExists = await this.orderModel.findOne({ table });

    if (orderAlreadyExists)
      throw new BadRequestException(`O pedido da mesa: "${table}" já existe`);

    const newOrder = new this.orderModel(createOrderDto);

    await newOrder.save();
    return newOrder;
  }

  async findAllOrders(): Promise<Order[]> {
    return await this.orderModel.find().populate('itens');
  }

  async findAllSend() {
    return await this.orderModel
      .find({ draft: false, status: false })
      .sort({ createdAt: 1 })
      .populate('itens');
  }

  async findOneOrder(_id: any) {
    const orderExists = await this.orderModel.findById(_id).populate({
      path: 'itens',
      populate: [
        {
          path: 'product_id',
        },
      ],
    });

    if (!orderExists) throw new BadRequestException('O pedido não existe');

    return orderExists;
  }

  async sendOrder(_id: string) {
    const orderExists = await this.orderModel.findById(_id);

    if (!orderExists) throw new BadRequestException('O pedido não existe');

    await this.orderModel.findByIdAndUpdate(orderExists, {
      $set: { draft: false },
    });

    return orderExists;
  }

  async removeOrder(_id: string) {
    const orderExists = await this.orderModel.findById({ _id });
    if (!orderExists) throw new BadRequestException('O pedido não existe');
    console.log(orderExists);

    try {
      await this.orderModel.findByIdAndDelete(_id);
      return {
        message: `Mesa ${orderExists.table} deletada com sucesso`,
      };
    } catch (error) {
      throw new BadRequestException(' Não foi possivel deleter o pedido');
    }
  }
}
