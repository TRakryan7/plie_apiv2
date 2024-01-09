import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PeriodService {
  constructor(private prisma: PrismaService) {}

  async createPeriode() {
    const date = new Date();
    const getMonth = date.getMonth() + 1;
    const getYear = date.getFullYear();
    let periodMonth = getMonth.toString();
    const periodYear = getYear.toString();

    if (getMonth < 10) {
      periodMonth = '0' + periodMonth;
    }

    const periodCollect = periodMonth + periodYear;
    const resultPeriod = await this.prisma.period.create({
      data: {
        periodCode: Number(periodCollect),
      },
    });
    return resultPeriod.periodCode;
  }

  async findPeriod(periodName: number) {
    const getPeriod = await this.prisma.period.findFirst({
      where: {
        periodCode: periodName,
      },
    });
    if (!getPeriod) {
      const getPeriod = await this.createPeriode();
      return getPeriod;
    }
    return getPeriod;
  }
}
