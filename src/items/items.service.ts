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
        return item;
      } catch (e) {
        console.log(e);
      }
    } else {
      throw new HttpException('Item code has been used', HttpStatus.CONFLICT);
    }
  }

  async getAllItem() {
    const getItems = this.prisma.items.findMany({
      where: {
        deletedAt: null,
      },
    });
    return getItems;
  }

  async editItem(itemId: string, data: CreateItemParams) {
    const getItem = await this.prisma.items.findUnique({
      where: {
        id: itemId,
      },
    });

    if (getItem) {
      const updatedItem = await this.prisma.items.update({
        data,
        where: {
          id: itemId,
        },
      });
      return updatedItem;
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
