import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    const checkTransactionNum = await this.prisma.movingHeader.findUnique({
      where: {
        documentCode: movingHeadaer.documentCode,
      },
    });

    if (checkTransactionNum) {
      throw new HttpException(
        'Document number has been taken',
        HttpStatus.FORBIDDEN,
      );
    }

    const checkWarehouse = await this.prisma.warehouses.findUnique({
      where: {
        id: movingHeadaer.warehouseId,
      },
    });

    if (!checkWarehouse) {
      throw new HttpException('warehouse not found', HttpStatus.NOT_FOUND);
    }
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

    for (let i = 0; i < detailData.length; i++) {
      detailData[i].movingHeaderId = createHeader.id;
      const detail = detailData[i];
      await this.movingDetailService.createDetail(
        detail,
        movingHeadaer.warehouseId,
      );
    }

    const result = await this.prisma.movingHeader.findUnique({
      where: {
        id: createHeader.id,
      },
      include: {
        details: true,
      },
    });

    return {
      success: true,
      message: 'Data created',
      data: {
        result,
      },
    };
  }

  async updateMovingItem(movingHeadaer: MovingParams){}

  async deleteMovingItem(id:string){}
}
