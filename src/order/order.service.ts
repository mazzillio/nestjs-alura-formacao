/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { In, Repository } from 'typeorm';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../user/user.entity';
import { OrderStatus } from './enum/orderstatus.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItem } from './orderItem.entity';
import { Product } from '../product/product.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  private async findUser({ id }) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  private evaluateOrderData(
    orderData: CreateOrderDto,
    relationsProducts: Product[],
  ) {
    orderData.orderItems.forEach((item) => {
      const relationProduct = relationsProducts.find(
        (product) => product.id === item.productId,
      );
      if (!relationProduct) {
        throw new NotFoundException(`Product ${item.productId} not found`);
      }
      if (item.quantity > relationProduct.availableQuantity) {
        throw new BadRequestException(
          `Require quantity (${item.quantity}) grather than available of ${relationProduct.name}`,
        );
      }
    });
  }
  async create(userId: string, orderData: CreateOrderDto): Promise<Order> {
    const user = await this.findUser({ id: userId });
    const procutsIds = orderData.orderItems.map((item) => item.productId);
    const relationsProducts = await this.productRepository.findBy({
      id: In(procutsIds),
    });
    this.evaluateOrderData(orderData, relationsProducts);
    const order = new Order();
    const orderItems = orderData.orderItems.map((item) => {
      const relationProduct = relationsProducts.find(
        (product) => product.id === item.productId,
      );

      const ordeItem = new OrderItem();
      ordeItem.product = relationProduct!;
      ordeItem.price = relationProduct!.value;
      ordeItem.quantity = item.quantity;
      ordeItem.product.availableQuantity -= ordeItem.quantity;
      return ordeItem;
    });

    const amountValue = orderItems.reduce((amount, item) => {
      return amount + item.price * item.quantity;
    }, 0);
    order.status = OrderStatus.PROCESSING;
    order.user = user;
    order.orderItem = orderItems;
    order.amount = amountValue;
    return await this.orderRepository.save(order);
  }
  async findByUser(userId: string): Promise<Order[]> {
    const order = this.orderRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }
  async updateOrder(orderId: string, updateData: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new NotFoundException('Oder not found');
    }
    Object.assign(order, <Order>updateData);
    return this.orderRepository.save(order);
  }
}
