import { Module } from '@nestjs/common';
import { MovingItemController } from './moving-item.controller';
import { MovingItemService } from './moving-item.service';
import { MovingItemDetailService } from './moving-item-detail/moving-item-detail.service';

@Module({
  controllers: [MovingItemController],
  providers: [MovingItemService, MovingItemDetailService]
})
export class MovingItemModule {}
