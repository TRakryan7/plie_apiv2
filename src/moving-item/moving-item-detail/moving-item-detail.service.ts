import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MovingItemDetailService {
  constructor(private prisma: PrismaService) {}

  async createDetail() {}
}
