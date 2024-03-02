import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemParams } from './entity';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async createItem(data: CreateItemParams) {
    const getItem = await this.prisma.items.findUnique({
      where: {
        itemCode: data?.itemCode,
      },
    });

    if (!getItem) {
      try {
        const item = await this.prisma.items.create({
          data,
        });
        return {
          success: true,
          message: 'Item Cretaed',
          data: {
            item: item,
          },
        };
      } catch (e) {
        throw new HttpException('Failed to create Item', HttpStatus.CONFLICT);
      }
    } else {
      throw new HttpException('Item code has been used', HttpStatus.CONFLICT);
    }
  }

  async getAllItem() {
    try {
      const getItems = await this.prisma.items.findMany({
        where: {
          deletedAt: null,
        },
      });
      return {
        success: true,
        message: 'Data found',
        data: {
          items: getItems,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Data not found',
      };
    }
  }

  async getItemById(itemId: string) {
    const getItem = await this.prisma.items.findUnique({
      where: {
        id: itemId,
      },
    });
    return getItem;
  }

  async editItem(itemId: string, data: CreateItemParams) {
    const getItem = await this.prisma.items.findUnique({
      where: {
        id: itemId,
      },
    });

    if (getItem) {
      try {
        const updatedItem = await this.prisma.items.update({
          data,
          where: {
            id: itemId,
          },
        });
        return {
          success: true,
          message: 'Data updated',
          data: {
            item: updatedItem,
          },
        };
      } catch (e) {
        return {
          success: false,
          message: 'Update failed',
          detail: e,
        };
      }
    }
  }

  async deletedItem(itemId: string) {
    const getItem = await this.prisma.items.findUnique({
      where: {
        id: itemId,
      },
    });
    if (getItem) {
      getItem.deletedAt = new Date(Date.now());
      const data = getItem;
      const updateItem = await this.prisma.items.update({
        data,
        where: {
          id: itemId,
        },
      });
      return updateItem;
    }
  }
}
