import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MovingDetailEditParams, MovingDetailParams } from '../entity';
import { StockService } from 'src/stock/stock.service';
import { PeriodService } from 'src/period/period.service';

@Injectable()
export class MovingItemDetailService {
  constructor(
    private prisma: PrismaService,
    private stockService: StockService,
    private periodeService: PeriodService,
  ) {}

  async createDetail(data: MovingDetailParams, warehouseId: string) {
    // const getPeriod = await this.periodeService.findPeriod();
    await this.stockService.createStock(data.total, data, warehouseId);

    const createDetail = this.prisma.movingDetail.create({
      data,
    });

    return createDetail;
  }

  async updateDetail(movingDetail: MovingDetailEditParams) {
    let total: number;
    //Dapatkan Transaksi Sebelumnya dengan Id
    const getDetail = await this.prisma.movingDetail.findFirst({
      where: {
        id: movingDetail.id,
      },
    });
    if (getDetail.rowsId != movingDetail.rowsId) {
      //Hapus Stock Sebelumnya jika RowId transaksi sebelumnya tidak sama dengan transaksi sekarang
      await this.stockService.updateWhenMinusTotal(
        getDetail.total,
        getDetail.itemId,
        getDetail.rowsId,
      );
      //Update stock baru
      await this.stockService.updateMovingStock(
        movingDetail.total,
        movingDetail.itemId,
        movingDetail.rowsId,
      );
    } else {
      //Jika RowId sama maka Cek apakah total transaksi lama lebih besar dari total transaksi sekarang
      if (movingDetail.total > getDetail.total) {
        total = movingDetail.total - getDetail.total;
        await this.stockService.updateMovingStock(
          total,
          movingDetail.itemId,
          movingDetail.rowsId,
        );
      }
      if (movingDetail.total < getDetail.total) {
        //Jika Tidak Sama Maka lakukan update pengurangan
        await this.stockService.updateWhenMinusTotal(
          movingDetail.total,
          movingDetail.itemId,
          movingDetail.rowsId,
        );
      }
    }

    //Start Update detail transaksi
    const result = await this.prisma.movingDetail.update({
      where: {
        id: movingDetail.id,
      },
      data: movingDetail,
    });

    return result;
  }
  async deleteDetail(idHeader: string) {
    const getDetail = await this.prisma.movingDetail.findMany({
      where: {
        movingHeaderId: idHeader,
      },
    });
    const date = await new Date();
    for (const item of getDetail) {
      item.deletedAt = date;
      let data = item;
      await this.prisma.movingDetail.update({
        where: {
          id: item.id,
        },
        data: { deletedAt: new Date() },
      });
      await this.stockService.updateWhenMinusTotal(
        data.total,
        data.itemId,
        data.rowsId,
      );
    }
  }
}
