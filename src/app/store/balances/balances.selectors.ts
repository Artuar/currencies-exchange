import { RootState } from "../rootState";
import { BalancesState } from "./balances.reducer";

export const balancesSelector = (state: RootState): BalancesState =>
  state.balances;
