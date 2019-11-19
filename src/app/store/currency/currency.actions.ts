import { createStandardAction } from "typesafe-actions";
import { Currency } from "./currency.reducer";

export const chooseCurrency = createStandardAction("@currency/CHOOSE_CURRENCY")<
  Currency
>();
