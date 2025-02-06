import { Controller, Get, Inject, Post } from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly _natsService: ClientProxy,
  ) {}

  @Post('register')
  register() {
    return this._natsService.send('auth.register.user', {});
  }

  @Post('login')
  login() {
    return this._natsService.send('auth.login.user', {});
  }

  @Get('verify')
  verifyToken() {
    return this._natsService.send('auth.verify.user', {});
  }
}
