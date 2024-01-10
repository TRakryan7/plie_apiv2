import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShelfParams } from './entity';

@Injectable()
export class ShelvesService {
  constructor(private prisma: PrismaService) {}

  async getAllShelvesByWarehouseId(warehouseId: string) {
    const getSheleves = await this.prisma.shelves.findMany({
      where: {
        warehouseId: warehouseId,
        isActive: true,
      },
    });
    return getSheleves;
  }

  async createShelf(data: ShelfParams) {
    const getWarehouse = await this.prisma.warehouses.findUnique({
      where: {
        id: data.warehouseId,
      },
    });

    if (!getWarehouse) {
      throw new HttpException('warehouse is  not found', HttpStatus.NOT_FOUND);
    }
    const shelves = await this.prisma.shelves.create({
      data,
    });
    return shelves;
  }

  async updateShelf(shelfId: string, data: ShelfParams) {
    const getShelf = await this.prisma.shelves.findUnique({
      where: {
        id: shelfId,
      },
    });
    if (!getShelf) {
      throw new HttpException('shelf is  not found', HttpStatus.NOT_FOUND);
    }
    const updateShelf = await this.prisma.shelves.update({
      data,
      where: {
        id: shelfId,
      },
    });
    return updateShelf;
  }

  async deleteShelf(shelfId: string) {
    const getDate = new Date(Date.now());
    const deletedShelf = await this.prisma.shelves.update({
      data: {
        deletedAt: getDate,
      },
      where: {
        id: shelfId,
      },
    });
    return deletedShelf;
  }
}
