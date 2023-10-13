import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Query('userId') userId: string, @Body() orderData: CreateOrderDto) {
    return this.orderService.create(userId, orderData);
  }
  @Get(':userId')
  find(@Param('userId') userId: string) {
    return this.orderService.findByUser(userId);
  }
  @Patch(':id')
  updateOrder(
    @Param('id') orderId: string,
    @Body() updateData: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(orderId, updateData);
  }
}
