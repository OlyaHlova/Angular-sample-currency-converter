import { Component } from '@angular/core';
import { ExchangeRatesComponent } from '../components/exchange-rates/exchange-rates.component';
import { ConverterComponent } from '../components/converter/converter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ExchangeRatesComponent, 
            ConverterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
}
