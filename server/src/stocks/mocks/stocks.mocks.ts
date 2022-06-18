import * as moment from 'moment';

export const expectedQuote = {
  name: 'AAPL',
  pricedAt: moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'),
  lastPrice: 131.56,
};

export const expectedHistory = {
  name: 'AAPL',
  prices: [
    {
      opening: 130.065,
      low: 129.81,
      high: 133.079,
      closing: 131.56,
      pricedAt: '2022-06-17',
      volume: 134520290,
    },
    {
      opening: 132.08,
      low: 129.04,
      high: 132.39,
      closing: 130.06,
      pricedAt: '2022-06-16',
      volume: 107961508,
    },
  ],
};

export const expectedCompare = {
  lastPrices: [
    {
      name: 'AAPL',
      pricedAt: moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'),
      lastPrice: 131.56,
    },
    {
      name: 'IBM',
      pricedAt: moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'),
      lastPrice: 131.56,
    },
    {
      name: 'MSFT',
      pricedAt: moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'),
      lastPrice: 131.56,
    },
  ],
};

export const expectedGains = {
  name: 'AAPL',
  lastPrice: 123.45,
  priceAtDate: 100,
  purchasedAmount: 100,
  purchasedAt: '2022-01-01',
  capitalGains: 100,
};
