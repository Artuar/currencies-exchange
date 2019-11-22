import { createStandardAction } from "typesafe-actions";
import { ChosenCurrencies } from "../rates/rates.types";

export const setCurrencies = createStandardAction("@rates/SET_CURRENCIES")<
  ChosenCurrencies
>();

export const setRate = createStandardAction("@rates/SET_RATE")<number>();

export const setValue = createStandardAction("@rates/SET_VALUE")<string>();

export const exchange = createStandardAction("@rates/EXCHANGE")<number>();
