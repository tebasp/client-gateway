import { ArrayMinSize, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDto } from './order-item.dto';

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true }) // each: true means that each item in the array should be validated
  @Type(() => OrderItemDto) // This is necessary to validate the nested objects
  items: OrderItemDto[];
}
