import * as moment from 'moment';

const STOCK_INFO_KEY = 'Meta Data';
const PRICES_INFO_KEY = 'Time Series (Daily)';
const STOCK_NAME_KEY = '2. Symbol';
const OPEN_KEY = '1. open';
const LOW_KEY = '3. low';
const HIGH_KEY = '2. high';
const CLOSE_KEY = '4. close';
const VOLUME_KEY = '5. volume';
const FORMAT_DATE = 'YYYY-MM-DD';

export class StocksEntity {
  public normalizeQuote(response: any): any {
    const recentDate = moment(new Date())
      .subtract(1, 'days')
      .format(FORMAT_DATE);

    const stockNormalized = {
      name: response[STOCK_INFO_KEY][STOCK_NAME_KEY],
      lastPrice: Number(response[PRICES_INFO_KEY][recentDate][CLOSE_KEY]),
      pricedAt: recentDate,
    };

    return stockNormalized;
  }

  public normalizeQuoteHistory(response: any, from: string, to: string) {
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
}
