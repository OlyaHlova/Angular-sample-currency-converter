import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterComponent } from './converter.component';
import { CurrencyDataService } from '../../services/currency-data.service';

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [],
      providers: [CurrencyDataService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ConverterComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should limit decimal digits', () => {
    const value = 10.56789;
    expect(component.limitDecimalDigits(value)).toEqual(10.57);
  });

  it('should convert from one currency to another correctly', () => {
    component.rate = { 'USD': 1.25, 'EUR': 1.12 };
    component.fromCurrency = 'EUR';
    component.toCurrency = 'USD';
    component.fromValue = 10;
    component.convertFrom();
    expect(component.toValue).toEqual(10 * 1.12 / 1.25);
  });

  it('should convert to one currency from another correctly', () => {
    component.rate = { 'USD': 1.25, 'EUR': 1.12 };
    component.fromCurrency = 'EUR';
    component.toCurrency = 'USD';
    component.toValue = 10;
    component.convertTo();
    expect(component.fromValue).toEqual(10 * 1.25 / 1.12);
  });

  it('should set initial values correctly', () => {
    component.ngOnInit();
    expect(component.rate).toBeDefined();
    expect(component.fromCurrency).toBeDefined();
    expect(component.toCurrency).toBeDefined();
    expect(component.fromValue).toBeUndefined();
    expect(component.toValue).toBeUndefined();
  });

  it('should set the rate from CurrencyDataService', () => {
    const rate = { 'USD': 1.25, 'EUR': 1.12 };
    const currencyDataService = TestBed.inject(CurrencyDataService);
    currencyDataService.rate = rate;
    component.ngOnInit();
    expect(component.rate).toEqual(rate);
  });

  it('should convert from and to currencies correctly', () => {
    component.rate = { 'USD': 1.25, 'EUR': 1.12 };
    component.fromCurrency = 'EUR';
    component.toCurrency = 'USD';
    component.fromValue = 10;
    component.convertFrom();
    component.convertTo();
    expect(component.fromValue).toEqual(10);
  });

  it('should not convert if rate is not available', () => {
    component.rate = {};
    component.fromValue = 10;
    component.convertFrom();
    expect(component.toValue).toBeUndefined();
  });

  it('should not convert if currency values are not numbers', () => {
    component.rate = { 'USD': 'invalid', 'EUR': 'invalid' };
    component.fromValue = 10;
    component.convertFrom();
    expect(component.toValue).toBeUndefined();
  });

});
