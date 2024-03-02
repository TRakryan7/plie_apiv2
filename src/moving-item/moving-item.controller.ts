import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MovingItemService } from './moving-item.service';
import { JwtGuard } from 'src/auth/guard';
import { MovingParams } from './entity';

@Controller('moving-item')
export class MovingItemController {
  constructor(private movingItem: MovingItemService) {}

  @UseGuards(JwtGuard)
  @Post('transaction')
  async createTransaction(@Body() movingParam: MovingParams) {
    const create = await this.movingItem.createMovingItem(movingParam);

    return create;
  }
}
