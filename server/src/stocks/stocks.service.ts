import { Injectable } from '@nestjs/common';
import { AlphaVantageAPI } from '../client/alpha.client';
import {
  CompareResponseDto,
  GainsResponseDto,
  HistoryResponseDto,
  QuoteResponseDto,
} from './dto/StocksResponseDto';
import { StocksEntity } from './entities/stocks.entity';

@Injectable()
export class StocksService {
  constructor(
    private readonly alphaClient: AlphaVantageAPI,
    protected stockEntity: StocksEntity,
  ) {}

  async getQuote(name: string): Promise<QuoteResponseDto> {
    try {
      const quote = await this.alphaClient.fetchStockByName(name);

      return this.stockEntity.normalizeQuote(quote);
    } catch (error) {
      throw error;
    }
  }

  async getHistory(
    name: string,
    from: string,
    to: string,
  ): Promise<HistoryResponseDto> {
    try {
      const history = await this.alphaClient.fetchStockByName(name);

      return this.stockEntity.normalizeQuoteHistory(history, from, to);
    } catch (error) {
      throw error;
    }
  }

  async getGains(
    name: string,
    purchaseAtTxt: string,
    amount: number,
  ): Promise<GainsResponseDto> {
    try {
      const gains = await this.alphaClient.fetchStockByName(name);

      return this.stockEntity.normalizeGains(gains, purchaseAtTxt, amount);
    } catch (error) {
      throw error;
    }
  }

  async getCompare(
    name: string,
    stocksToCompare: string[],
  ): Promise<CompareResponseDto> {
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
