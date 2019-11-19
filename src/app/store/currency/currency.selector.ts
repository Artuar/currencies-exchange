import { createSelector } from "reselect";
import { RootState } from "../rootState";
import { CurrencyState } from "./currency.reducer";

const currencySelector = (state: RootState): CurrencyState => state.currency;

export const currentCurrencySelector = createSelector(
  currencySelector,
  (state: CurrencyState): string => state.currentCurrency
);
