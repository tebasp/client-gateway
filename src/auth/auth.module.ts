import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { NatModule } from '../transports/nat.module';

@Module({
  controllers: [AuthController],
  providers: [],
  imports: [NatModule],
})
export class AuthModule {}
