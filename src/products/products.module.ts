import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatModule } from '../transports/nat.module';

@Module({
  controllers: [ProductsController],
  imports: [NatModule],
})
export class ProductsModule {}
