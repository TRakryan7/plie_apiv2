import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(JwtGuard)
  @Put('update/:id')
  async updateItem(@Param('id') id: string, @Body() editItem: CreateItemDto) {
    const item = await this.itemService.editItem(id, editItem);
    return item;
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  async deleteItem(@Param('id') id: string) {
    return await this.itemService.deletedItem(id);
  }
}
