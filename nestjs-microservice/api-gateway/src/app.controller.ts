import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateOrderRequest } from './dto/create-order-request.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createOrder(@Body() createOrderRequest: CreateOrderRequest) {
    this.appService.createOrder(createOrderRequest);
  }

  @Get('order-info/:userId')
  async getOrderInfo(@Param('userId') userId: string) {
    return this.appService.getOrderInfo(userId);
  }
}
