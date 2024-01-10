import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ShelvesService } from './shelves.service';
import { JwtGuard } from 'src/auth/guard';
import { ShelvesDto } from './entity';

@Controller('shelves')
export class ShelvesController {
  constructor(private shelvesService: ShelvesService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  async createShelves(@Body() shelvesDto: ShelvesDto) {
    const createShelf = await this.shelvesService.createShelf(shelvesDto);
    return createShelf;
  }
}
