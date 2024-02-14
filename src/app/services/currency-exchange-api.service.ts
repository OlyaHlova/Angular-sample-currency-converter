import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EXCHANGE_RATE_API_KEY } from '../constants/keys.constants';
import { ExchangeRateResponse } from '../shared/interfaces/exchange-rate-response.interface';

@Injectable({
    providedIn: 'root'
})

export class CurrencyExchangeApiService {
    private apiKey = EXCHANGE_RATE_API_KEY;

    constructor(private http: HttpClient) {}

    getExchangeRates(): Observable<ExchangeRateResponse> {
        const url = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/UAH`;
        return this.http.get<ExchangeRateResponse>(url);
    }
}
