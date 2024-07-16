import { ApiProperty } from '@nestjs/swagger';
export class WorkOrder {
  @ApiProperty({ example: 500 })
  hourlyRate: number;

  @ApiProperty({ example: 5 })
  hoursToComplete: number;

  @ApiProperty({ example: 'ATM machine fix.' })
  title: string;

  @ApiProperty({ example: 12345 })
  id: number;
}
