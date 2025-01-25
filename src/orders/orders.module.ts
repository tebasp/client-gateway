import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { NatModule } from '../transports/nat.module';

@Module({
  controllers: [OrdersController],
  imports: [NatModule],
})
export class OrdersModule {}
