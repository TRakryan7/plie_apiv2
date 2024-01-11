import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { JwtGuard } from 'src/auth/guard';
import { ShelvesDto } from './entity';

@Controller('shelves')
export class ShelvesController {
  constructor(private shelvesService: ShelvesService) {}

  @UseGuards(JwtGuard)
  @Get('all')
  async getShleves() {
    const getShelf = await this.shelvesService.getAllShelves();
    return getShelf;
  }

  @UseGuards(JwtGuard)
  @Post('create')
  async createShelves(@Body() shelvesDto: ShelvesDto) {
    const createShelf = await this.shelvesService.createShelf(shelvesDto);
    return createShelf;
  }
}
