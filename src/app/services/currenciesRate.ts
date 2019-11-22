// import { ajax, AjaxResponse } from 'rxjs/ajax';
// import { map } from 'rxjs/operators';
import { Observable, from } from "rxjs";
import { Currency } from "app/store/currency/currency.types";
import fetchJsonp from "fetch-jsonp";

const ACCESS_KEY = "e620e2e814914332b30a13d7e9af7e49";

export const fetchCurrenciesRate = (
  main: Currency,
  to: Currency
): Observable<number> => {
  // This free API use USD as base currency
  const promise = fetchJsonp(
    `https://openexchangerates.org/api/latest.json?app_id=${ACCESS_KEY}&symbols=${main},${to}`,
    {
      jsonpCallback: "callback"
    }
  )
    .then(res => res.json())
    .then(({ rates }: CurrenciesRateResponse) => {
      return rates[to] / rates[main];
    });
  return from(promise);
};

export interface CurrenciesRateResponse {
  rates: { [key in Currency]: number };
  base: Currency;
}
