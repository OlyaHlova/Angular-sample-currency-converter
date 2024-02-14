import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyDataService {
  private _rate: Record<string, number | string> = {};

  constructor() {}

  get rate(): Record<string, number | string> {
    return this._rate;
  }

  set rate(value: Record<string, number | string>) {
    this._rate = value;
  }
}
