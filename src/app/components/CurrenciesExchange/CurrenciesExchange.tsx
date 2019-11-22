import * as React from "react";
import * as styles from "./CurrenciesExchange.scss";
import { Link, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  chosenCurrenciesSelector,
  rateSelector,
  valueSelector
} from "../../store/rates/rates.selectors";
import { Currency } from "../../store/currency/currency.types";
import * as actions from "../../store/rates/rates.actions";
import { useEffect } from "react";
import { currenciesSelector } from "../../store/currency/currency.selectors";
import { balancesSelector } from "../../store/balances/balances.selectors";
import { ExchangeItem } from "./ExchangeItem/ExchangeItem";
import { ResultItem } from "./ResultItem/ResultItem";
import { Carusel } from "../Carusel/Carusel";
import { CaruselType } from "../Carusel/Carusel.types";

const useStateSelectors = () => ({
  currencies: useSelector(currenciesSelector),
  chosenCurrencies: useSelector(chosenCurrenciesSelector),
  rate: useSelector(rateSelector),
  balances: useSelector(balancesSelector),
  value: useSelector(valueSelector)
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    setCurrencies: (from: Currency, to: Currency) =>
      dispatch(actions.setCurrencies({ from, to })),
    setValue: (value: string) => dispatch(actions.setValue(value)),
    exchange: (value: number) => dispatch(actions.exchange(value))
  };
};

export const CurrenciesExchange: React.FunctionComponent = () => {
  const {
    chosenCurrencies: { from, to },
    currencies,
    rate,
    balances,
    value
  } = useStateSelectors();
  const { setCurrencies, setValue, exchange } = useDispatchActions();
  const { currency } = useParams();
  const history = useHistory();
  const formatedRate = rate ? rate.toFixed(2) : "0";
  const result = +value * +formatedRate;

  const getTo = (chosen: Currency) => {
    if (to !== chosen) {
      return to;
    }
    return currencies.indexOf(chosen) === 0 ? currencies[1] : currencies[0];
  };

  const onExchange = () => {
    exchange(result);
    history.push({ pathname: "/" });
  };

  useEffect(() => {
    const choosen = currency as Currency;
    setCurrencies(choosen, getTo(choosen));
    return () => {
      setValue("");
    };
  }, []);

  return (
    <>
      <div className={styles.currencies}>
        <div className={styles.buttons}>
          <Link to="/">
            <button className={styles.cancel}>Cancel</button>
          </Link>
          { rate ?
            <button className={styles.exchange} onClick={onExchange}>
              Exchange
            </button>
            : null
          }
        </div>
        <Carusel
          list={currencies.map(currency => {
            return {
              text: (
                <ExchangeItem
                  from={currency}
                  balance={balances[currency]}
                  value={value}
                  onChange={setValue}
                  active={currency === from}
                />
              ),
              value: currency
            };
          })}
          active={from}
          onChange={(chosen: Currency) => setCurrencies(chosen, getTo(chosen))}
          type={CaruselType.Flat}
        />
      </div>
      <div className={styles.exchanges}>
        <Carusel
          list={currencies
            .filter(cur => cur !== from)
            .map(currency => {
              return {
                text: (
                  <ResultItem
                    to={to}
                    from={from}
                    balance={balances[to]}
                    result={result}
                    rate={formatedRate}
                  />
                ),
                value: currency
              };
            })}
          active={to}
          onChange={(chosen: Currency) => setCurrencies(from, chosen)}
          type={CaruselType.Flat}
        />
        <div className={styles.triangular} />
      </div>
    </>
  );
};
