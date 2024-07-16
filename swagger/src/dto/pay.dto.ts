import { ApiProperty } from '@nestjs/swagger';
export class Pay {
  @ApiProperty({ example: 1028, description: 'Amount that is paid!' })
  amount: number;

  @ApiProperty({example: 'USD'})
  currency: string;

  @ApiProperty({example: 'card'})
  paymentMethod: string;

  @ApiProperty({example: 12345})
  orderId: number;
}
