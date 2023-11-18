import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @UseGuards(AuthGuard('jwt'))
    @Get('all')
    async getUser(){
        const users = this.userService.findUser()
        return users
    }
}
