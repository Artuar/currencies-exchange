import { createStandardAction } from "typesafe-actions";
import { Balace } from "./balances.types";

export const updateBalance = createStandardAction("@balances/UPDATE_BALANCE")<
  Balace
>();
