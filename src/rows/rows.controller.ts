import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { RowsService } from './rows.service';
import { JwtGuard } from 'src/auth/guard';
import { RowParams } from './entity';

@Controller('rows')
export class RowsController {
  constructor(private rowsService: RowsService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async createRow(@Body() rowParam: RowParams) {
    return this.rowsService.createRow(rowParam);
  }
}
