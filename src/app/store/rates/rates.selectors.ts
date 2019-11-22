import { createSelector } from "reselect";
import { RootState } from "../rootState";
import { RatesState } from "./rates.reducer";
import { ChosenCurrencies } from "./rates.types";

const ratesSelector = (state: RootState): RatesState => state.rates;

export const chosenCurrenciesSelector = createSelector(
  ratesSelector,
  ({ from, to }: RatesState): ChosenCurrencies => ({ from, to })
);

export const rateSelector = createSelector(
  ratesSelector,
  (state: RatesState): number | undefined => state.rate
);

export const valueSelector = createSelector(
  ratesSelector,
  (state: RatesState): string => state.value
);
