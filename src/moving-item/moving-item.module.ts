import { Module } from '@nestjs/common';
import { MovingItemController } from './moving-item.controller';
import { MovingItemService } from './moving-item.service';
import { MovingItemDetailService } from './moving-item-detail/moving-item-detail.service';
import { PeriodService } from 'src/period/period.service';
import { StockService } from 'src/stock/stock.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MovingItemController],
  providers: [
    MovingItemService,
    MovingItemDetailService,
    PeriodService,
    StockService,
    PrismaService,
  ],
})
export class MovingItemModule {}
