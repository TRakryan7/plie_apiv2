import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockParams } from './entity';

@Injectable()
export class StockService {
  constructor(private prisma: PrismaService) {}

  async getStock(itemId: string, rowId: string) {
    const getSTockItem = await this.prisma.stock.findUnique({
      where: {
        itemId: itemId,
        rowsId: rowId,
      },
    });
    return getSTockItem;
  }

  async updateMovingStock(total: number, itemId: string, rowId: string) {
    const getStockItem = await this.prisma.stock.findUnique({
      where: {
        itemId: itemId,
        rowsId: rowId,
      },
    });

    if (total < 0) {
      getStockItem.stockOut = getStockItem.stockOut + total;
    } else {
      getStockItem.stockIn = getStockItem.stockIn + total;
    }
    getStockItem.stockTotal = getStockItem.stockTotal + total;

    const dataId = getStockItem.id;
    delete getStockItem.id;
    const data = getStockItem;

    const updateStock = await this.prisma.stock.update({
      data,
      where: {
        id: dataId,
      },
    });
    return updateStock;
  }

  async createStock(total: number, data: StockParams) {
    const getStockItem = await this.getStock(data.itemId, data.rowsId);

    if (getStockItem) {
      return await this.updateMovingStock(total, data.itemId, data.rowsId);
    }

    const createNewStock = await this.prisma.stock.create({
      data,
    });

    return createNewStock;
  }
}
