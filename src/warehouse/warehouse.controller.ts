import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { JwtGuard } from 'src/auth/guard';
import { WarehouseDto } from './entity';

@Controller('warehouse')
export class WarehouseController {
  constructor(private warehouseService: WarehouseService) {}

  @UseGuards(JwtGuard)
  @Get('all')
  async getAllWarehouse() {
    return this.warehouseService.getAllWarehouse();
  }

  @UseGuards(JwtGuard)
  @Get('get/:id')
  async getWarehouse(@Param('id') warehouseId: string) {
    return this.warehouseService.getWarehouse(warehouseId);
  }

  @UseGuards(JwtGuard)
  @Post('create')
  async createWarehouse(@Body() createWarehouse: WarehouseDto) {
    return this.warehouseService.createWarehouse(createWarehouse);
  }

  @UseGuards(JwtGuard)
  @Put('update/:id')
  async updateWarehouse(
    @Param('id') warehouseId: string,
    @Body() createWarehouse: WarehouseDto,
  ) {
    return this.warehouseService.updateWarehouse(warehouseId, createWarehouse);
  }
}
