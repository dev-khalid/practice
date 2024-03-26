import { Injectable, NotFoundException } from '@nestjs/common';
import { GetUserRequest } from './get-user-request.dto';

@Injectable()
export class AppService {
  private readonly users: { userId: string; stripeUserId: string }[] = [
    {
      userId: '123',
      stripeUserId: '43234',
    },
    {
      userId: '345',
      stripeUserId: '27279',
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  getUser(getUserRequest: GetUserRequest) { 
    let userData = this.users?.find(
      (user) => user?.userId == getUserRequest?.userId,
    );
    if (!userData) {
      throw new NotFoundException(
        `User not found with userId: ${getUserRequest?.userId}`,
      );
    }
    return userData;
  }
}
