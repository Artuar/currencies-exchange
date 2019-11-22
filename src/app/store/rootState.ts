import { CurrencyState } from "./currency/currency.reducer";
import { RatesState } from "./rates/rates.reducer";
import { BalancesState } from "./balances/balances.reducer";

export interface RootState {
  currency: CurrencyState;
  rates: RatesState;
  balances: BalancesState;
}
