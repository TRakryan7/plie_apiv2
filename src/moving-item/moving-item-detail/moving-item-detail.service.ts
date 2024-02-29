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
  ) {}

  // async createDetail(data: MovingDetailParams) {
  //   const getPeriod = await this.periodService.findPeriod();
  //   const stock = await this.stockService.createStock(data.total);

  //   const createDetail = this.prisma.movingDetail.create({
  //     data: {
  //       itemDescription: data.itemDescription,
  //       size: data.size,
  //       category: data.category,
  //       total: data.total,
  //       note: data.note,
  //       shelvesId: data.shelvesId,
  //       itemId: data.itemId,
  //       rowsId: data.rowsId,
  //       period: getPeriod,
  //       createdBy: data.createdBy,
  //       updatedBy: data.updatedBy,
  //     },
  //   });

  //   return;
  // }
}
