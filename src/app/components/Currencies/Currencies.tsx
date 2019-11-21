import * as React from "react";
import * as styles from "./Currencies.scss";
import { Link } from "react-router-dom";
import { Carusel } from "../Carusel/Carusel";
import { Currency } from "app/store/currency/currency.types";
import { currentCurrencySelector, currenciesSelector } from "app/store/currency/currency.selectors";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/currency/currency.actions";
import { balancesSelector } from "app/store/balances/balances.selectors";
import { getSign } from "app/store/currency/currency.helpers";

export interface CaruselItem {
  text: string | React.ReactNode;
  value: string;
}

const useStateSelectors = () => ({
  currentCurrency: useSelector(currentCurrencySelector),
  currencies: useSelector(currenciesSelector),
  balances: useSelector(balancesSelector),
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    chooseCurrency: (currency: Currency) =>
      dispatch(actions.chooseCurrency(currency))
  };
};

export const Currencies: React.FunctionComponent = () => {
  const { currentCurrency, balances, currencies } = useStateSelectors();
  const { chooseCurrency } = useDispatchActions();
  const list: CaruselItem[] = currencies.map((currency: Currency) => {
    return {text: `${balances[currency]} ${getSign(currency)}`, value: currency}
  });
  return (
    <>
      <Carusel list={list} active={currentCurrency} onChange={chooseCurrency}/>
      <div className={styles.buttons}>
        <Link to={`/exchange/${currentCurrency}`}>
          <button className={styles.exchange}/>
        </Link>
      </div>
    </>
  );
};
