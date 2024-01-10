import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RowParams } from './entity';

@Injectable()
export class RowsService {
  constructor(private prisma: PrismaService) {}

  async findRow(rowId: string) {
    const getRow = await this.prisma.rows.findUnique({
      where: {
        id: rowId,
      },
    });
    return getRow;
  }

  async findByWarehouseId(warehouseId: string) {
    const getRows = await this.prisma.rows.findMany({
      where: {
        warehouseId: warehouseId,
      },
    });
    return getRows;
  }

  async findByShelvesId(shelvesId: string) {
    const getRows = await this.prisma.rows.findMany({
      where: {
        shelvesId: shelvesId,
      },
    });
    return getRows;
  }

  async createRow(data: RowParams) {
    const getWarehouse = await this.prisma.warehouses.findUnique({
      where: {
        id: data.warehouseId,
      },
    });
    const getSheleves = await this.prisma.shelves.findUnique({
      where: {
        id: data.shelvesId,
      },
    });
    if (!getWarehouse) {
      throw new HttpException('warehouse is  not found', HttpStatus.NOT_FOUND);
    }
    if (!getSheleves) {
      throw new HttpException('shelves is  not found', HttpStatus.NOT_FOUND);
    }
    const getRow = await this.prisma.rows.create({
      data,
    });
    return getRow;
  }

  async updateRow(rowId: string, data: RowParams) {
    const getWarehouse = await this.prisma.warehouses.findUnique({
      where: {
        id: data.warehouseId,
      },
    });
    const getSheleves = await this.prisma.shelves.findUnique({
      where: {
        id: data.shelvesId,
      },
    });
    if (!getWarehouse) {
      throw new HttpException('warehouse is  not found', HttpStatus.NOT_FOUND);
    }
    if (!getSheleves) {
      throw new HttpException('shelves is  not found', HttpStatus.NOT_FOUND);
    }

    const updatedRow = await this.prisma.rows.update({
      data,
      where: {
        id: rowId,
      },
    });
    return updatedRow;
  }
}
