import { Component, OnInit } from '@angular/core';
import { CurrencyExchangeApiService } from '../../services/currency-exchange-api.service';
import { CurrencyDataService } from '../../services/currency-data.service';
import { CommonModule } from '@angular/common';
import { CURRENCIES } from '../../constants/currency.constants';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-exchange-rates',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: './exchange-rates.component.html',
  styleUrl: './exchange-rates.component.scss'
})

export class ExchangeRatesComponent implements OnInit {
  currencies = CURRENCIES;
  rate: Record<string, number | string> = {};

  constructor(private currencyExchangeApiService: CurrencyExchangeApiService,
              private currencyDataService: CurrencyDataService ) {}

  ngOnInit() {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.currencyExchangeApiService.getExchangeRates().subscribe(data => {
      this.currencies.forEach(currency => {
        this.rate[currency] = 1 / data.conversion_rates[currency];
      });
    });
    this.currencyDataService.rate = this.rate;
  }
}
