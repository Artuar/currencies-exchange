import * as React from "react";
import * as styles from "./CurrenciesExchange.scss";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { chosenCurrenciesSelector, rateSelector, valueSelector } from "app/store/rates/rates.selectors";
import { Currency } from "app/store/currency/currency.types";
import * as actions from "../../store/rates/rates.actions";
import { useEffect } from "react";
import { currenciesSelector } from "app/store/currency/currency.selectors";
import { getSign } from "app/store/currency/currency.helpers";
import { balancesSelector } from "app/store/balances/balances.selectors";

const useStateSelectors = () => ({
  currencies: useSelector(currenciesSelector),
  chosenCurrencies: useSelector(chosenCurrenciesSelector),
  rate: useSelector(rateSelector),
  balances: useSelector(balancesSelector),
  value: useSelector(valueSelector),
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    setCurrencies: (from: Currency, to: Currency) =>
      dispatch(actions.setCurrencies({ from, to })),
    setValue:  (value: string) =>
      dispatch(actions.setValue(value)),
  };
};

export const CurrenciesExchange: React.FunctionComponent = () => {
  const { chosenCurrencies: { from, to }, currencies, rate, balances, value } = useStateSelectors();
  const { setCurrencies, setValue } = useDispatchActions();
  let { currency } = useParams();

  useEffect(() => {
    const getTo = () => {
      if (to !== currency) {
        return to;
      }
      return currencies.indexOf(currency) === 0 ? currencies[1]: currencies[0];
    }
    setCurrencies(currency as Currency, getTo());
  }, []);

  const formatedRate = rate ? rate.toFixed(2) : rate;
  const fromSign = getSign(from);
  const toSign = getSign(to);

  return (
    <>
      <div className={styles.currencies}>
        <div className={styles.buttons}>
          <Link to="/">
            <button className={styles.cancel}>Cancel</button>
          </Link>
          <button className={styles.exchange}>Exchange</button>
        </div>
        <div className={styles.carusel}>
          <div className={styles.items}>
            <div className={styles.item}>
              <div className={styles.currency}>
                <div className={styles.name}>
                  { from }
                </div>
                <div className={styles.statement}>
                  You have { fromSign } { balances[from] }
                </div>
              </div>
              <div className={styles.sum}>
                <input type="text"
                       className={styles.input}
                       onChange={event => setValue(event.target.value)}
                       value={value}
                />
              </div>
            </div>
          </div>
          <div className={styles.slider}>
            <div className={styles.point}/>
            <div className={classNames(styles.point, styles.active)}/>
            <div className={styles.point}/>
          </div>
        </div>
      </div>
      <div className={styles.exchanges}>
        <div className={styles.carusel}>
          <div className={styles.items}>
            <div className={styles.item}>
            <div className={styles.currency}>
              <div className={styles.name}>
                { to }
              </div>
              <div className={styles.statement}>
                You have { toSign } { balances[to] }
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.sum}>
                { +value * +(formatedRate || 0) }
              </div>
              <div className={styles.rate}>
                { toSign }1 = { fromSign }{ formatedRate }
              </div>
            </div>
            </div>
          </div>
          <div className={styles.slider}>
            <div className={styles.point}/>
            <div className={classNames(styles.point, styles.active)}/>
            <div className={styles.point}/>
          </div>
        </div>
        <div className={styles.triangular}/>
      </div>
    </>
  );
};
