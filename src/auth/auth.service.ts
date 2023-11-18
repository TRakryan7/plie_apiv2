import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto, LoginUserDto } from "./dto";
import * as Argon from "argon2" 
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { serialize } from "v8";

@Injectable()
export class AuthService{

    constructor( 
        private prisma:PrismaService, 
        private jwt:JwtService, 
        private config:ConfigService
        ){}

    async signup(dto:CreateUserDto){
        try{
            // generate password
            const hash = await Argon.hash(dto.password)
            //simpan user
            const user = await this.prisma.users.create({
                data:{
                    ...dto,
                    password:hash
                },
            });

            const token = await this.signToken(user.id,user.email)

            delete user.password
            return { 
                data: user,
                access_token: token 
            } 
        } catch(err){
            if (err instanceof PrismaClientKnownRequestError){
                if(err.code === "P2002"){
                    throw new ForbiddenException('Credentials taken')
                }
            }
            throw err;
        }
    }

    async signin(dto:LoginUserDto){

        //temukan user via email
        const user = await this.prisma.users.findUnique({
            where:{
                email:dto.email
            }
        })
        //kalau tidak ada user lempar exception
        if(!user) throw new ForbiddenException("Credential Incorrect");
        //bandingkan password
        const pwMAtches = await Argon.verify(user.password,dto.password);
        //jika password tidak sama lempar exception
        if(!pwMAtches){
            throw new ForbiddenException("Credential Incorrect")
        }

        //kembalikan user
        delete user.password;
        return this.signToken(user.id,user.email);
    }

    async signToken(userId:string,email:string):Promise<{ access_token:string }>{
        const secret = this.config.get("JWT_SECRET")

        const payload = {
            sub:userId,email
        }

        const token = await this.jwt.signAsync(
            payload,
            {
                expiresIn:'1h',
                secret:secret
            }
        )

        return {
            access_token : token
        }
    }


}