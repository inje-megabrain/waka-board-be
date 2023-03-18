import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceConfig } from './data-source';

import { AppModule } from '@app/app.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    AppModule,
    TypeOrmModule.forRoot(dataSourceConfig),
    ScheduleModule.forRoot(),
  ],
})
export class MainModule {}
