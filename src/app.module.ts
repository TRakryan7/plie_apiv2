import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { PeriodModule } from './period/period.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ShelvesModule } from './shelves/shelves.module';
import { RowsModule } from './rows/rows.module';
import { StockModule } from './stock/stock.module';
import { MovingItemModule } from './moving-item/moving-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    ItemsModule,
    PeriodModule,
    WarehouseModule,
    ShelvesModule,
    RowsModule,
    StockModule,
    MovingItemModule,
  ],
})
export class AppModule {}
