// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `${__dirname}/../../.env.${process.env.NODE_ENV}`,
});

import { Test, TestingModule } from '@nestjs/testing';
import { AlphaVantageAPI } from '../client/alpha.client';
import { StocksEntity } from './entities/stocks.entity';
import { StocksController } from './stocks.controller';
import { StocksService } from './stocks.service';
import {
  expectedQuote,
  expectedHistory,
  expectedGains,
  expectedCompare,
} from './mocks/stocks.mocks';

describe('StocksController', () => {
  let controller: StocksController;
  let service: StocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StocksController],
      providers: [StocksService, AlphaVantageAPI, StocksEntity],
    }).compile();

    service = module.get<StocksService>(StocksService);
    controller = module.get<StocksController>(StocksController);
  });

  it('should be return a quote', async () => {
    jest
      .spyOn(service, 'getQuote')
      .mockImplementation(() => Promise.resolve(expectedQuote));

    const result = await controller.getQuote('AAPL');

    expect(result).toEqual(expectedQuote);
  });

  it('should be return the stock history', async () => {
    jest
      .spyOn(service, 'getHistory')
      .mockImplementation(() => Promise.resolve(expectedHistory));

    const result = await controller.getHistory(
      'AAPL',
      '2022-06-15',
      '2022-06-18',
    );

    expect(result).toEqual(expectedHistory);
  });

  it('should be return the current quote price compared to other', async () => {
    jest
      .spyOn(service, 'getCompare')
      .mockImplementation(() => Promise.resolve(expectedCompare));

    const result = await controller.getCompare('AAPL', ['IBM', 'MSFT']);

    expect(result).toEqual(expectedCompare);
  });

  it('should be return the gains projection on a specific date', async () => {
    jest
      .spyOn(service, 'getGains')
      .mockImplementation(() => Promise.resolve(expectedGains));

    const result = await controller.getGains('AAPL', '2022-01-01', 100);

    expect(result).toEqual(expectedGains);
  });
});
