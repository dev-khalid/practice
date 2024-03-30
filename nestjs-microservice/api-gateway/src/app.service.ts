import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order-request.dto';
import { ClientKafka } from '@nestjs/microservices';
import { OrderCreatedEvent } from './dto/order-created-event.dto';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
  ) {}
  onModuleInit() {
    this.billingClient.subscribeToResponseOf('order_info');
  }
  getHello(): string {
    return 'Hello World!';
  }
  generateOrderId() {
    const randomNum = Math.round(Math.random() * 1000000);

    return randomNum.toString().padStart(6, '0');
  }
  createOrder({ userId, price }: CreateOrderRequest) {
    this.billingClient.emit(
      'order_created',
      new OrderCreatedEvent(this.generateOrderId(), userId, price),
    );
  }
  async getOrderInfo(userId: string) {
    let p = new Promise((resolve) => {
      this.billingClient.send('order_info', { userId }).subscribe((value) => {
        resolve(value);
      });
    });

    // return {
    //   userId,
    // };
    return await p;
  }
}
