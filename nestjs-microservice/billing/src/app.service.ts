import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { OrderCreatedEvent } from './order-created-event.dto';
import { ClientKafka } from '@nestjs/microservices';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}
  onModuleInit() {
    this.authClient.subscribeToResponseOf('get_user');
  }
  getHello(): string {
    return 'Hello World!';
  }

  handleOrderCreated(orderCreatedEvent: OrderCreatedEvent) {
    this.authClient
      .send('get_user', new GetUserRequest(orderCreatedEvent.userId))
      .subscribe((user) => {
        console.log(
          `Billing user with stripe ID ${user?.stripeUserId} a price of $${orderCreatedEvent?.price}...`,
        );
      });
  }
}
