import { Module } from '@nestjs/common';
import { AlphaVantageAPI } from 'src/client/alpha.client';
import { StocksEntity } from './entities/stocks.entity';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';

@Module({
  controllers: [StocksController],
  providers: [StocksService, AlphaVantageAPI, StocksEntity],
})
export class StocksModule {}
