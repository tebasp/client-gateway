import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from './dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorators';
import { CurrentUserInterface } from './interfaces/current-user.interface';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE)
    private readonly _natsService: ClientProxy,
  ) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this._natsService.send('auth.register.user', registerUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this._natsService.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get('verify')
  @UseGuards(AuthGuard)
  verifyToken(@User() user: CurrentUserInterface, @Token() token: string) {
    return { user, token };
  }
}
