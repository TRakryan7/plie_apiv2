import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovingDetailParams } from '../entity';
import { StockService } from 'src/stock/stock.service';
import { PeriodService } from 'src/period/period.service';
import { StockParams } from 'src/stock/entity';

@Injectable()
export class MovingItemDetailService {
  constructor(
    private prisma: PrismaService,
    private stockService: StockService,
    private periodeService: PeriodService,
  ) {}

  async createDetail(data: MovingDetailParams, warehouseId: string) {
    // const getPeriod = await this.periodeService.findPeriod();
    const stock = await this.stockService.createStock(
      data.total,
      data,
      warehouseId,
    );
    
    const createDetail = this.prisma.movingDetail.create({
      data,
    });

    return createDetail;
  }
}
