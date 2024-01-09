import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { WarehouseParams } from './entity/warehouse.type';

@Injectable()
export class WarehouseService {
  constructor(private prisma: PrismaService) {}

  async getAllWarehouse() {
    const getWarehouse = await this.prisma.warehouses.findMany({
      where: {
        isActive: true,
      },
    });
    return getWarehouse;
  }

  async getWarehouse(warehouseId: string) {
    const getWarehouse = await this.prisma.warehouses.findUnique({
      where: {
        id: warehouseId,
      },
    });
    return getWarehouse;
  }

  async createWarehouse(data: WarehouseParams) {
    const createWarehouse = await this.prisma.warehouses.create({
      data,
    });

    return createWarehouse;
  }

  async updateWarehouse(warehouseId: string, data: WarehouseParams) {
    const getWarehouse = await this.prisma.warehouses.findUnique({
      where: {
        id: warehouseId,
      },
    });
    if (!getWarehouse) {
      throw new HttpException('warehouse is  not found', HttpStatus.NOT_FOUND);
    }
    const result = await this.prisma.warehouses.update({
      data,
      where: {
        id: warehouseId,
      },
    });
    return result;
  }
}
