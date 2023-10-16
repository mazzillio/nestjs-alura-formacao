import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  AuthenticateGuard,
  IRequestUser,
} from '../authenticate/authenticate.guard';

@UseGuards(AuthenticateGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req() req: IRequestUser, @Body() orderData: CreateOrderDto) {
    const { user } = req;
    return this.orderService.create(user.sub, orderData);
  }
  @Get()
  find(@Req() req: IRequestUser) {
    const { user } = req;
    return this.orderService.findByUser(user.sub);
  }
  @Patch(':id')
  updateOrder(
    @Req() req: IRequestUser,
    @Param('id') orderId: string,
    @Body() updateData: UpdateOrderDto,
  ) {
    const { sub } = req.user;
    return this.orderService.updateOrder(sub, orderId, updateData);
  }
}
