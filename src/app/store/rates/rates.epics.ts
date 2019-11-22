import { filter, map, switchMap, withLatestFrom, mergeMap, takeUntil, startWith } from "rxjs/operators";
import { RootAction } from "app/store/rootActions";
import { RootState } from "app/store/rootState";
import { Epic, combineEpics } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import * as actions from "../rates/rates.actions";
import * as balancesActions from "../balances/balances.actions";
import { Services } from "app/services/rootServices";
import { chosenCurrenciesSelector, rateSelector } from "./rates.selectors";
import { balancesSelector } from "../balances/balances.selectors";
import { interval } from "rxjs";

export const getCurrenciesRateEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { currenciesRateService }) => {
  return action$.pipe(
      filter(isActionOf(actions.setCurrencies)),
      mergeMap(({ payload: { from, to }}) => {
        return interval(10000).pipe(
          startWith(0),
          switchMap(() => {
            return currenciesRateService(from, to).pipe(
              map(rate => actions.setRate(rate))
            )
          }),
          takeUntil(action$.pipe(filter(isActionOf(actions.setCurrencies)))
        )
      )
      })
    )
};

export const exchangeEpic: Epic<RootAction, RootAction, RootState> = (
  action$,
  state$
) => {
  const chosen$ = state$.pipe(map(chosenCurrenciesSelector));
  const rate$ = state$.pipe(map(rateSelector));
  const balances$ = state$.pipe(map(balancesSelector));
  return action$.pipe(
    filter(isActionOf(actions.exchange)),
    withLatestFrom(chosen$, rate$, balances$),
    map(([{ payload }, { from, to }, rate, balances]) => {
      return balancesActions.updateBalance([
        {
          currency: from,
          sum: balances[from] - payload
        },
        {
          currency: to,
          sum: balances[to] - payload * (rate || 0)
        }
      ]);
    })
  );
};

export const ratesEpic = combineEpics(getCurrenciesRateEpic, exchangeEpic);
