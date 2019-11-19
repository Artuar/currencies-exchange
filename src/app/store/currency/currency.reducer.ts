import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./currency.actions";

export const enum Currency {
  USD = "usd",
  EUR = "eur",
  GBP = "gbp",
}

export interface CurrencyState {
  currentCurrency: Currency;
}

export const currencyDefaultState: CurrencyState = {
  currentCurrency: Currency.EUR,
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
