import { OrderStatusEnum, OrderStatusList } from '../enum';
import { IsEnum, IsOptional } from 'class-validator';

export class OrderStatusDto {
  @IsEnum(OrderStatusEnum, {
    message: `status must be one of the following values: ${OrderStatusList}`,
  })
  @IsOptional()
  status?: OrderStatusEnum;
}
