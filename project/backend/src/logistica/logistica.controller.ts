import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('logistica')
@UseGuards(AuthGuard('jwt'))
export class LogisticaController {
  @Get()
  findAll() {
    return { message: 'Listar todos os registros de logística' };
  }

  @Get('shipments')
  getShipments() {
    return { message: 'Listar envios' };
  }
}
