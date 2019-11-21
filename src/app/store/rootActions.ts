import { ActionType } from "typesafe-actions";
import * as currencyActions from "./currency/currency.actions";
import * as ratesActions from "./rates/rates.actions";
import * as balancesActions from "./balances/balances.actions";

export type CurrencyAction = ActionType<typeof currencyActions>;
export type RatesAction = ActionType<typeof ratesActions>;
export type BalancesAction = ActionType<typeof balancesActions>;

export type RootAction = CurrencyAction | RatesAction | BalancesAction;
