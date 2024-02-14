import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExchangeRatesComponent } from './exchange-rates.component';
import { CurrencyExchangeApiService } from '../../services/currency-exchange-api.service';
import { of } from 'rxjs';

describe('ExchangeRatesComponent', () => {
  let component: ExchangeRatesComponent;
  let fixture: ComponentFixture<ExchangeRatesComponent>;
  let currencyExchangeApiService: jasmine.SpyObj<CurrencyExchangeApiService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CurrencyExchangeApiService', ['getExchangeRates']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CurrencyExchangeApiService, useValue: spy }]
    }).compileComponents();

    currencyExchangeApiService = TestBed.inject(CurrencyExchangeApiService) as jasmine.SpyObj<CurrencyExchangeApiService>;
    fixture = TestBed.createComponent(ExchangeRatesComponent);
    component = fixture.componentInstance;
  });

  it('should create the ExchangeRatesComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch exchange rates', () => {
    const mockData = {
      conversion_rates: {
        USD: 0.025,
        EUR: 0.024, 
        UAH: 1,
        GBP: 0.02,
        PLN: 0.105
      },
      base_currency_code: "UAH",
      time_last_update_utc: "Wed, 14 Feb 2024 02:00:01 +0000"
    };;

    // Mocking the observable returned by getExchangeRates() to return the mock data
    currencyExchangeApiService.getExchangeRates.and.returnValue(of(mockData));

    // Calling ngOnInit() explicitly to trigger the API call
    component.ngOnInit();

    // Asserting that getExchangeRates() has been called
    expect(currencyExchangeApiService.getExchangeRates).toHaveBeenCalled();

    // Asserting that the rate property is correctly set after the API call
    expect(component.rate).toEqual({
      UAH: 1 / mockData.conversion_rates.UAH ,
      USD: 1 / mockData.conversion_rates.USD,
      EUR: 1 / mockData.conversion_rates.EUR,
      GBP: 1 / mockData.conversion_rates.GBP,
      PLN: 1 / mockData.conversion_rates.PLN
    });
  });
});
