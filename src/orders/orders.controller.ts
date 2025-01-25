import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';
import { CreateOrderDto } from './dto';
import { catchError } from 'rxjs';
import { PaginationDto } from '../common';
import { OrderStatusDto } from './dto/order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly _natsService: ClientProxy,
  ) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this._natsService.send('createOrder', createOrderDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this._natsService.send('findAllOrders', paginationDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Get('/status/:status')
  findAllByStatus(
    @Param() orderStatusDto: OrderStatusDto,
    @Query() paginationDto: PaginationDto,
  ) {
    return this._natsService
      .send('findAllOrders', {
        ...paginationDto,
        status: orderStatusDto?.status,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this._natsService.send('findOneOrder', { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id') id: number,
    @Body() orderStatusDto: OrderStatusDto,
  ) {
    return this._natsService
      .send('changeOrderStatus', {
        id,
        ...orderStatusDto,
      })
      .pipe(
        catchError((error) => {
          throw new RpcException(error);
        }),
      );
  }
}
