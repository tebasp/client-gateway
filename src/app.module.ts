import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { NatModule } from './transports/nat.module';

@Module({
  imports: [ProductsModule, OrdersModule, NatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
