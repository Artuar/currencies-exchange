import { createSelector } from "reselect";
import { RootState } from "../rootState";
import { CurrencyState } from "./currency.reducer";
import { Currency } from "./currency.types";

const currencySelector = (state: RootState): CurrencyState => state.currency;

export const currenciesSelector = createSelector(
  currencySelector,
  (state: CurrencyState): Currency[] => state.currencies
);

export const currentCurrencySelector = createSelector(
  currencySelector,
  (state: CurrencyState): Currency => state.currentCurrency
);
