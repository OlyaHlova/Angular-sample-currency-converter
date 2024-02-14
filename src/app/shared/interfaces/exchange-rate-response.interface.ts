export interface ExchangeRateResponse {
    conversion_rates: { [key: string]: number };
    base_currency_code: string;
    time_last_update_utc: string;
}