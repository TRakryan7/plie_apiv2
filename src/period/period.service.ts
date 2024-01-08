import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PeriodParams } from './entity/period.types';

@Injectable()
export class PeriodService {
  constructor(private prisma: PrismaService) {}

  async createPeriode(data: PeriodParams) {
    const date = new Date();
    const getMonth = date.getMonth() + 1;
    const getYear = date.getFullYear();
    let periodMonth = getMonth.toString();
    const periodYear = getYear.toString();

    if (getMonth < 10) {
      periodMonth = '0' + periodMonth;
    }

    const periodCollect = periodMonth + periodYear;
    data.periodCode = Number(periodCollect);

    await this.prisma.period.create({
      data,
    });
  }

  async findPeriod(periodName: number) {
    const getPeriod = await this.prisma.period.findFirst({
      where: {
        periodCode: periodName,
      },
    });
    // if(!getPeriod){
    //   const createPeriod = this.createPeriode()
    // }
  }
}
