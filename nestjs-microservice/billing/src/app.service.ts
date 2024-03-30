import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { OrderCreatedEvent } from './order-created-event.dto';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class AppService implements OnModuleInit {
  private orderStorage: OrderCreatedEvent[] = [];
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}
  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }
  getHello(): string {
    return 'Hello World!';
  }

  getOrderInfo(
    orderCreatedEvent: Partial<OrderCreatedEvent>,
  ): OrderCreatedEvent[] {
    return this.orderStorage.filter(
      (item) => item?.userId == orderCreatedEvent?.userId,
    );
  }
  storeOrderInfo(orderCreatedEvent: OrderCreatedEvent) {
    this.orderStorage.push(orderCreatedEvent);
  }
  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    this.authClient
      .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
      .subscribe((user) => {
        this.storeOrderInfo({
          ...orderCreatedEvent,
          stripePriceId: user?.stripeUserId,
        });
        console.log(this.orderStorage);
        console.log(
          `Billing user with stripe ID ${user?.stripeUserId} a price of $${orderCreatedEvent?.price}...`,
        );
      });
  }

  async getOrdersByUserId(orderCreatedEvent: Partial<OrderCreatedEvent>) {
    console.log(orderCreatedEvent);
    return this.getOrderInfo(orderCreatedEvent);
  }
}
