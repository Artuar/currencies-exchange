import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./balances.actions";
import { Currency } from "../currency/currency.types";

export type BalancesState = {
  [balance in Currency]: number;
}

export const balancesDefaultState: BalancesState = {
  [Currency.GBP]: 20.0,
  [Currency.USD]: 30.0,
  [Currency.EUR]: 40.0,
};

export const balancesReducer = (
  state: BalancesState = balancesDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(actions.updateBalance): {
      const newState = { ...state };
      action.payload.forEach(balance => (newState[balance.currency] = balance.sum))
      return newState;
;
    }
    default:
      return state;
  }
};
