import { ApiProperty } from '@nestjs/swagger';
import { Pay } from './pay.dto';
import { WorkOrder } from './workorder.dto';

export class CombinedDto {
  @ApiProperty({ type: Pay })
  pay: Pay;
  @ApiProperty({ type: WorkOrder })
  workOrder: WorkOrder;
}
