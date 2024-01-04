import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findUser() {
    try {
      const user = await this.prisma.users.findMany();
      return user;
    } catch (err) {
      throw err;
    }
  }

  async editUser(){}
}
