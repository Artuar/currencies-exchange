import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./currency.actions";
import { Currency } from "./currency.types";

export interface CurrencyState {
  currentCurrency: Currency;
  currencies: Currency[];
}

export const currencyDefaultState: CurrencyState = {
  currentCurrency: Currency.GBP,
  currencies: [Currency.EUR, Currency.USD, Currency.GBP]
};

export const currencyReducer = (
  state: CurrencyState = currencyDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(actions.chooseCurrency): {
      return {
        ...state,
        currentCurrency: action.payload
      };
    }
    default:
      return state;
  }
};
