import { fetchCurrenciesRate } from "./currenciesRate";
import { Observable } from "rxjs";
import { Currency } from "app/store/currency/currency.types";

export interface Services {
  currenciesRateService(base: Currency, list: Currency): Observable<number>
}

export const services: Services = {
  currenciesRateService: fetchCurrenciesRate,
};
