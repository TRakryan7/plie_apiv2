import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { PeriodService } from 'src/period/period.service';
import { ShelvesService } from 'src/shelves/shelves.service';
import { RowsService } from 'src/rows/rows.service';
import { ItemsService } from 'src/items/items.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';

@Module({
  controllers: [StockController],
  providers: [
    StockService,
    PeriodService,
    ShelvesService,
    RowsService,
    ItemsService,
    WarehouseService,
  ],
})
export class StockModule {}
