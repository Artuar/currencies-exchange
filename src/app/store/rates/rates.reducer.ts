import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./rates.actions";
import { Currency } from "../currency/currency.types";

export interface RatesState {
  from: Currency;
  to: Currency;
  rate: number | undefined;
  value: string;
}

export const ratesDefaultState: RatesState = {
  from: Currency.GBP,
  to: Currency.EUR,
  rate: undefined,
  value: '',
};

export const ratesReducer = (
  state: RatesState = ratesDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(actions.setCurrencies): {
      const { from, to } = action.payload;
      return {
        ...state,
        from,
        to,
        rate: undefined,
      };
    }
    case getType(actions.setRate): {
      return {
        ...state,
        rate: action.payload
      };
    }
    case getType(actions.setValue): {
      return {
        ...state,
        value: action.payload
      };
    }
    default:
      return state;
  }
};
