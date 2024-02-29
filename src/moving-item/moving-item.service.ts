import { Injectable } from '@nestjs/common';
import { PeriodService } from 'src/period/period.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockService } from 'src/stock/stock.service';
import { MovingItemDetailService } from './moving-item-detail/moving-item-detail.service';
import { MovingParams } from './entity';
import { WarehouseService } from 'src/warehouse/warehouse.service';

@Injectable()
export class MovingItemService {
  constructor(
    private prisma: PrismaService,
    private periodService: PeriodService,
    private movingDetailService: MovingItemDetailService,
  ) {}

  async createMovingItem(movingHeadaer: MovingParams) {
    const getPeriod = await this.periodService.findPeriod();
    const detailData = movingHeadaer.detail;

    const createHeader = await this.prisma.movingHeader.create({
      data: {
        documentCode: movingHeadaer.documentCode,
        total: movingHeadaer.total,
        note: movingHeadaer.note,
        period: getPeriod,
        warehouseId: movingHeadaer.warehouseId,
        createdBy: movingHeadaer.createdBy,
        updatedBy: movingHeadaer.createdBy,
      },
    });

    for (let i = 0; i <= detailData.length; i++) {
      let j = 0;
      const detail = detailData[j];
      // this.movingDetailService.createDetail(detail);
      j++;
    }
  }
}
