import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';
import { Users } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  async getUser(@GetUser('') user: Users) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getOneUser(@Param('id') id: string){
    return this.userService.findUser({ id });
  }
}
