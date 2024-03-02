import { Module } from '@nestjs/common';
import { MovingItemController } from './moving-item.controller';
import { MovingItemService } from './moving-item.service';
import { MovingItemDetailService } from './moving-item-detail/moving-item-detail.service';
import { PeriodService } from 'src/period/period.service';
import { StockService } from 'src/stock/stock.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShelvesService } from 'src/shelves/shelves.service';
import { RowsService } from 'src/rows/rows.service';
import { ItemsService } from 'src/items/items.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';

@Module({
  controllers: [MovingItemController],
  providers: [
    MovingItemService,
    MovingItemDetailService,
    PeriodService,
    StockService,
    PrismaService,
    ShelvesService,
    RowsService,
    ItemsService,
    WarehouseService,
  ],
})
export class MovingItemModule {}
