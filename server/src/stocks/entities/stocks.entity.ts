import * as moment from 'moment';
import {
  GainsResponseDto,
  HistoryResponseDto,
  QuoteResponseDto,
} from '../dto/StocksResponseDto';

const STOCK_INFO_KEY = 'Meta Data';
const PRICES_INFO_KEY = 'Time Series (Daily)';
const STOCK_NAME_KEY = '2. Symbol';
const OPEN_KEY = '1. open';
const LOW_KEY = '3. low';
const HIGH_KEY = '2. high';
const CLOSE_KEY = '4. close';
const VOLUME_KEY = '5. volume';
const FORMAT_DATE = 'YYYY-MM-DD';
const RECENT_INDEX = 0;

export class StocksEntity {
  public getRecentDate(object: any): string {
    const keys = Object.keys(object);

    return keys[RECENT_INDEX];
  }

  public normalizeQuote(response: any): QuoteResponseDto {
    const recentDate = this.getRecentDate(response[PRICES_INFO_KEY]);

    const stockNormalized = {
      name: response[STOCK_INFO_KEY][STOCK_NAME_KEY],
      lastPrice: Number(response[PRICES_INFO_KEY][recentDate][CLOSE_KEY]),
      pricedAt: recentDate,
    };

    return stockNormalized;
  }

  public normalizeQuoteHistory(
    response: any,
    from: string,
    to: string,
  ): HistoryResponseDto {
    const history = {
      name: response[STOCK_INFO_KEY][STOCK_NAME_KEY],
      prices: [],
    };

    const fromDate = moment(from, FORMAT_DATE);
    const toDate = moment(to, FORMAT_DATE);

    for (const daily in response[PRICES_INFO_KEY]) {
      const dateMoment = moment(daily, FORMAT_DATE);

      if (dateMoment.isBetween(fromDate, toDate)) {
        history.prices.push({
          opening: Number(response[PRICES_INFO_KEY][daily][OPEN_KEY]),
          low: Number(response[PRICES_INFO_KEY][daily][LOW_KEY]),
          high: Number(response[PRICES_INFO_KEY][daily][HIGH_KEY]),
          closing: Number(response[PRICES_INFO_KEY][daily][CLOSE_KEY]),
          pricedAt: dateMoment.format(FORMAT_DATE),
          volume: Number(response[PRICES_INFO_KEY][daily][VOLUME_KEY]),
        });
      }
    }

    return history;
  }

  public normalizeGains(
    response: any,
    purchaseAtTxt: string,
    amount: number,
  ): GainsResponseDto {
    return {
      name: 'AAPL',
      lastPrice: 123.45,
      pricedAtDate: 100,
      purchasedAmount: 100,
      purchasedAt: '2022-01-01',
      capitalGains: -100,
    };
  }
}
