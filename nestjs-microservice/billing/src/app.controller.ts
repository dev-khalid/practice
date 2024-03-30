import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { OrderCreatedEvent } from './order-created-event.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('order_created')
  handleOrderCreated(data: OrderCreatedEvent) {
    this.appService.handleOrderCreated(data);
  }

  @MessagePattern('order_info')
  getOrdersByUserId(data: Partial<OrderCreatedEvent>) {
    return this.appService.getOrdersByUserId(data);
  }
}
