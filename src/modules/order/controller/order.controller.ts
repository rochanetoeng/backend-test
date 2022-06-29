import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Get()
  findAllOrders() {
    return this.orderService.findAllOrders();
  }

  @Get('/findone')
  findOne(@Query('id') _id: string) {
    return this.orderService.findOneOrder(_id);
  }

  @Get('/send')
  findAllSend() {
    return this.orderService.findAllSend();
  }
  @Patch('/send')
  async sendOrder(@Body() _id: string) {
    return await this.orderService.sendOrder(_id);
  }

  @Delete(':id')
  remove(@Param('id') _id: string) {
    return this.orderService.removeOrder(_id);
  }
}
