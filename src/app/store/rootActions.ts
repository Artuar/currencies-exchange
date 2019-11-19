import { ActionType } from "typesafe-actions";
import * as currencyActions from "./currency/currency.actions";

export type CurrencyAction = ActionType<typeof currencyActions>;

export type RootAction = CurrencyAction;
