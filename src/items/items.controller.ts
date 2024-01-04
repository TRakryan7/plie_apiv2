import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { ItemsService } from './items.service';
import { CreateItemDto } from './entity';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @UseGuards(JwtGuard)
  @Get('all')
  async getAllItem() {
    const getItem = await this.itemService.getAllItem();
    return getItem;
  }

  @UseGuards(JwtGuard)
  @Post('create')
  async createNewItem(@Body() CreateItem: CreateItemDto) {
    const createItem = await this.itemService.createItem(CreateItem);
    return createItem;
  }
}
