import { InternalError } from '../utils/errors/internal-error';
import { HttpException } from '@nestjs/common';
import axios, { AxiosError, AxiosInstance } from 'axios';

export const alphaAPIInstance: AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  transformRequest: [
    (data) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data) => {
      return JSON.parse(data);
    },
  ],
});

export class ClientRequestError extends InternalError {
  constructor(message: string) {
    const internalMessage = `Unexpected error when trying to communicate to Alpha Vantage API: ${message}`;
    super(internalMessage);
  }
}

export class AlphaVantageAPIResponseError extends InternalError {
  constructor(message: string) {
    const internalMessage = `Unexpected error returned by the Alpha Vantage API service: ${message}`;
    super(internalMessage, 409, 'Alpha Vantage API error');
  }
}

export class AlphaVantageAPI {
  constructor(protected request = alphaAPIInstance) {}

  private isRequestError(error: AxiosError): boolean {
    return !!(error.response && error.status && error.name);
  }

  public async fetchStockByName(stockName: string): Promise<any> {
    const FUNCTION_NAME = 'TIME_SERIES_DAILY';

    try {
      const response: any = await this.request.get(
        `/query?function=${FUNCTION_NAME}&symbol=${stockName}&apikey=${process.env.API_KEY}`,
      );

      if (response.data.hasOwnProperty('Note')) {
        throw new HttpException(response.data['Note'], 429);
      }

      if (response.data.hasOwnProperty('Error Message')) {
        throw new HttpException(response.data['Error Message'], 400);
      }

      return response.data;
    } catch (error: any) {
      if (this.isRequestError(error)) {
        throw new AlphaVantageAPIResponseError(
          `Error: ${JSON.stringify(error.response)} Code: ${error.status}`,
        );
      }
      throw new ClientRequestError(error.message);
    }
  }
}
