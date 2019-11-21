import { createStandardAction } from "typesafe-actions";
import { Currency } from "./currency.types";

export const chooseCurrency = createStandardAction("@currency/CHOOSE_CURRENCY")<
  Currency
>();
