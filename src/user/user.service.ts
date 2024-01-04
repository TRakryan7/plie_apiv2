import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUsers() {
    try {
      const user = await this.prisma.users.findMany();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async findUser(userWhereUniqueInput: Prisma.UsersWhereUniqueInput) {
    try {
      const user = await this.prisma.users.findUnique({
        where: userWhereUniqueInput,
      });
      delete user.password;
      return user;
    } catch (e) {
      console.log(e);
    }
  }
}
