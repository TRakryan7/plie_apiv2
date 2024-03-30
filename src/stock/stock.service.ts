import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockParams } from './entity';
import { MovingDetailParams } from 'src/moving-item/entity';
import { PeriodService } from 'src/period/period.service';
import { ShelvesService } from 'src/shelves/shelves.service';
import { RowsService } from 'src/rows/rows.service';
import { ItemsService } from 'src/items/items.service';
import { WarehouseService } from 'src/warehouse/warehouse.service';

@Injectable()
export class StockService {
  constructor(
    private prisma: PrismaService,
    private periodService: PeriodService,
    private shelfService: ShelvesService,
    private rowService: RowsService,
    private itemService: ItemsService,
    private warehouseService: WarehouseService,
  ) {}

  async getStock(itemId: string, rowId: string) {
    const getSTockItem = await this.prisma.stock.findUnique({
      where: {
        itemId: itemId,
        rowsId: rowId,
      },
    });
    return getSTockItem;
  }

  async createStock(
    total: number,
    dataMoving: MovingDetailParams,
    warehouseId: string,
  ) {
    const getStockItem = await this.getStock(
      dataMoving.itemId,
      dataMoving.rowsId,
    );

    if (getStockItem) {
      return await this.updateMovingStock(
        total,
        dataMoving.itemId,
        dataMoving.rowsId,
      );
    }

    let data: StockParams;
    const getPeriod = await this.periodService.findPeriod();
    const getDataRow = await this.rowService.findRow(dataMoving.rowsId);
    const getDataShelf = await this.shelfService.getShelfById(
      dataMoving.shelvesId,
    );
    const getItem = await this.itemService.getItemById(dataMoving.itemId);
    const getWarehouse = await this.warehouseService.getWarehouse(warehouseId);

    data = {
      period: getPeriod,
      stockTotal: dataMoving.total,
      stockIn: 0,
      stockOut: 0,
      itemDescription: dataMoving.itemDescription,
      itemCode: getItem.itemCode,
      size: dataMoving.size,
      color: dataMoving.color,
      category: dataMoving.category,
      warehouseName: getWarehouse.warehouseName,
      warehouseCode: getWarehouse.warehouseCode,
      shelfName: getDataShelf.shelfName,
      shelfCode: getDataShelf.shelfCode,
      rowName: getDataRow.rowCode,
      rowCode: getDataRow.rowCode,
      itemId: dataMoving.itemId,
      warehouseId: warehouseId,
      shelvesId: dataMoving.shelvesId,
      rowsId: dataMoving.rowsId,
    };
    const createNewStock = await this.prisma.stock.create({
      data,
    });

    return createNewStock;
  }

  async updateMovingStock(total: number, itemId: string, rowId: string) {
    const getStockItem = await this.prisma.stock.findUnique({
      where: {
        itemId: itemId,
        rowsId: rowId,
      },
    });

    if (total < 0) {
      getStockItem.stockOut = getStockItem.stockOut + Math.abs(total);
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

  async updateWhenMinusTotal(total: number, itemId: string, rowId: string) {
    const getStockItem = await this.prisma.stock.findUnique({
      where: {
        itemId: itemId,
        rowsId: rowId,
      },
    });
    getStockItem.stockOut = getStockItem.stockOut - total;
    getStockItem.stockTotal = getStockItem.stockTotal + Math.abs(total);
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
}
