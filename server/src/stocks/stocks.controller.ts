import {
  ConflictException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CompareResponseDto,
  GainsResponseDto,
  HistoryResponseDto,
  QuoteResponseDto,
} from './dto/StocksResponseDto';
import { StocksService } from './stocks.service';

@ApiTags('stocks')
@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  // fetch quote by stock name
  @ApiOkResponse({ type: QuoteResponseDto })
  @Get(':name/quote')
  async getQuote(@Param('name') name: string): Promise<QuoteResponseDto> {
    try {
      const quote = await this.stocksService.getQuote(name);

      return quote;
    } catch (error) {
      if (error.code === 409) {
        throw new ConflictException(error.message);
      }
      throw new Error(error);
    }
  }

  // fetch stock history
  @ApiOkResponse({ type: HistoryResponseDto })
  @Get(':name/history')
  async getHistory(
    @Param('name') name: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ): Promise<HistoryResponseDto> {
    try {
      const history = await this.stocksService.getHistory(name, from, to);

      return history;
    } catch (error) {
      if (error.code === 409) {
        throw new ConflictException(error.message);
      }
      throw new Error(error);
    }
  }

  // fetch stock gains
  @ApiOkResponse({ type: GainsResponseDto })
  @Get(':name/gains')
  async getGains(
    @Param('name') name: string,
    @Query('purchaseAtTxt') purchaseAtTxt?: string,
    @Query('amount') amount?: number,
  ) {
    try {
      const gains = await this.stocksService.getGains(
        name,
        purchaseAtTxt,
        amount,
      );

      return gains;
    } catch (error) {
      if (error.code === 409) {
        throw new ConflictException(error.message);
      }
      throw new Error(error);
    }
  }

  // fetch stock comparision
  @ApiOkResponse({ type: CompareResponseDto })
  @Get(':name/compare')
  async getCompare(
    @Param('name') name: string,
    @Query('stocksToCompare') stocksToCompare: string[],
  ): Promise<CompareResponseDto> {
    try {
      const comparison = await this.stocksService.getCompare(
        name,
        stocksToCompare,
      );

      return comparison;
    } catch (error) {
      if (error.code === 409) {
        throw new ConflictException(error.message);
      }
      throw new Error(error);
    }
  }
}
