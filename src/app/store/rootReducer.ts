import { combineReducers } from "redux";
import { currencyReducer } from "./currency/currency.reducer";

export const rootReducer = combineReducers({
  currency: currencyReducer,
});
