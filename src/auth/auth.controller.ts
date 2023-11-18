import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto, LoginUserDto } from "./dto";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() authDto:CreateUserDto){
        return this.authService.signup(authDto)
    }

    @Post('signin')
    signin(@Body() loginDto:LoginUserDto){
        return this.authService.signin(loginDto)
    }

}