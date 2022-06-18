import { Injectable } from '@nestjs/common';
import { AlphaVantageAPI } from '../client/alpha.client';
import { StocksEntity } from './entities/stocks.entity';

// create stock gains mock
const gainsMock = {
  name: 'AAPL',
  lastPrice: 123.45,
  priceAtDate: 100,
  purchasedAmount: 100,
  purchasedAt: '2022-01-01',
  capitalGains: -100,
};

@Injectable()
export class StocksService {
  constructor(
    private readonly alphaClient: AlphaVantageAPI,
    protected stockEntity: StocksEntity,
  ) {}

  async getQuote(name: string) {
    try {
      const quote = await this.alphaClient.fetchStockByName(name);

      return this.stockEntity.normalizeQuote(quote);
    } catch (error) {
      throw error;
    }
  }

  async getHistory(name: string, from: string, to: string) {
    try {
      const history = await this.alphaClient.fetchStockByName(name);

      return this.stockEntity.normalizeQuoteHistory(history, from, to);
    } catch (error) {
      throw error;
    }
  }

  async getGains(name: string, purchaseAtTxt: string, amount: number) {
    try {
      const gains = await this.alphaClient.fetchStockByName(name);

      return gainsMock;
    } catch (error) {
      throw error;
    }
  }

  async getCompare(name: string, stocksToCompare: string[]) {
    try {
      const lastPrices = [];

      const quote = await this.alphaClient.fetchStockByName(name);

      lastPrices.push(this.stockEntity.normalizeQuote(quote));

      for (let i = 0; i < stocksToCompare.length; i++) {
        const quoteToCompare = await this.alphaClient.fetchStockByName(
          stocksToCompare[i],
        );

        lastPrices.push(this.stockEntity.normalizeQuote(quoteToCompare));
      }

      return { lastPrices };
    } catch (error) {
      throw error;
    }
  }
}
