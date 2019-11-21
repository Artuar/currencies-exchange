import {
  filter,
  map,
  switchMap,
} from "rxjs/operators";
import { RootAction } from "app/store/rootActions";
import { RootState } from "app/store/rootState";
import { Epic, combineEpics } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import * as actions from "../rates/rates.actions";
import { Services } from "app/services/rootServices";

export const getCurrenciesRateEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { currenciesRateService }) => {
  return action$.pipe(
    filter(isActionOf(actions.setCurrencies)),
    switchMap(({ payload: { from, to }}) =>
      currenciesRateService(from, to).pipe(
        map(rate => actions.setRate(rate))
      )
    ),
  );
};

export const ratesEpic = combineEpics(
  getCurrenciesRateEpic,
);
