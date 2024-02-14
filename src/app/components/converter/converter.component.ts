import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CURRENCIES } from '../../constants/currency.constants';
import { CurrencyDataService } from '../../services/currency-data.service';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.scss'
})

export class ConverterComponent {
  @Input() rate: Record<string, number | string> = {};
  @Input() fromCurrency = CURRENCIES[1];
  @Input() toCurrency = CURRENCIES[0];
  @Input() fromValue!: number;
  @Input() toValue!: number;

  currencies = CURRENCIES;

  constructor(private currencyDataService: CurrencyDataService ) {}

  ngOnInit() {
    this.rate = this.currencyDataService.rate;
  }

  converter(direction: string) {
    const fromCurrencyValue = this.rate[this.fromCurrency] as number;
    const toCurrencyValue = this.rate[this.toCurrency] as number;

    if (typeof fromCurrencyValue === 'number' && typeof toCurrencyValue === 'number') {
      if (direction === 'from') {
        this.toValue = this.fromValue * fromCurrencyValue / toCurrencyValue;
      } else {
        this.fromValue = this.toValue * toCurrencyValue / fromCurrencyValue;
      }
    }
  }

  convertFrom() {
    this.converter('from');
  }

  convertTo() {
    this.converter('to');
  }

  limitDecimalDigits(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
