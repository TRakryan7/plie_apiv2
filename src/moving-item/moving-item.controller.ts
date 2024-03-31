import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MovingItemService } from './moving-item.service';
import { JwtGuard } from 'src/auth/guard';
import { MovingEditParams, MovingParams } from './entity';

@Controller('moving-item')
export class MovingItemController {
  constructor(private movingItem: MovingItemService) {}

  @UseGuards(JwtGuard)
  @Get('all')
  async getAllMovingTrancation() {
    return this.movingItem.getAllMovingTrancationService();
  }

  @UseGuards(JwtGuard)
  @Get('get/:id')
  async getMovingTrancationById(@Param('id') id: string) {
    return this.movingItem.getMovingTrancationByIdService(id);
  }

  @UseGuards(JwtGuard)
  @Post('transaction')
  async createTransaction(@Body() movingParam: MovingParams) {
    const create = await this.movingItem.createMovingItem(movingParam);

    return create;
  }

  @UseGuards(JwtGuard)
  @Put('update')
  async updateTransaction(@Body() movingParam: MovingEditParams) {
    const update = await this.movingItem.updateMovingItem(movingParam);

    return update;
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  async deleteTransaction(@Param('id') id: string) {
    const deleteItem = await this.movingItem.deleteMovingItem(id);

    return deleteItem;
  }
}
