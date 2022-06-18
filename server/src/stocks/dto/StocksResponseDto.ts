import { ApiProperty } from '@nestjs/swagger';

class PricesDto {
  @ApiProperty({ description: 'Open price', example: 123.45 })
  opening: number;

  @ApiProperty({ description: 'Closing price', example: 123.45 })
  low: number;

  @ApiProperty({ description: 'Closing price', example: 123.45 })
  high: number;

  @ApiProperty({ description: 'Closing price', example: 123.45 })
  closing: number;

  @ApiProperty({ description: 'Date', example: '2022-01-01' })
  pricedAt: string;

  @ApiProperty({ description: 'Volume', example: 5 })
  volume: number;
}

export class QuoteResponseDto {
  @ApiProperty({ description: 'Stock name', example: 'AAPL' })
  name: string;

  @ApiProperty({ description: 'Last price', example: 120.56 })
  lastPrice: number;

  @ApiProperty({ description: 'Priced At', example: '2022-06-18' })
  pricedAt: string;
}

// create stock history dto object
export class HistoryResponseDto {
  @ApiProperty({ description: 'Stock name', example: 'AAPL' })
  name: string;

  @ApiProperty({
    description: 'Prices',
    example: '[{opening: 120, low: 100}, {opening: 120, low: 100}]',
  })
  prices: PricesDto[];
}
export class GainsResponseDto {
  @ApiProperty({ description: 'Stock name', example: 'AAPL' })
  name: string;

  @ApiProperty({ description: 'Last price', example: 120.56 })
  lastPrice: number;

  @ApiProperty({ description: 'Price at date', example: 100 })
  pricedAtDate: number;

  @ApiProperty({ description: 'Purchased amount', example: 100 })
  purchasedAmount: number;

  @ApiProperty({ description: 'Purchased at', example: '2022-06-18' })
  purchasedAt: string;

  @ApiProperty({ description: 'Capital gains', example: 100 })
  capitalGains: number;
}

export class CompareResponseDto {
  @ApiProperty({
    description: 'Last prices',
    example: `[{name: 'AAPL, last price: 120.56', pricedAt: '2022-06-18'}, {name: 'IBM, last price: 120.56', pricedAt: '2022-06-18'}]`,
  })
  lastPrices: QuoteResponseDto[];
}
