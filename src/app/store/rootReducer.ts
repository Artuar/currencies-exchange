import { combineReducers } from "redux";
import { currencyReducer } from "./currency/currency.reducer";
import { ratesReducer } from "./rates/rates.reducer";
import { balancesReducer } from "./balances/balances.reducer";

export const rootReducer = combineReducers({
  currency: currencyReducer,
  rates: ratesReducer,
  balances: balancesReducer,
});
