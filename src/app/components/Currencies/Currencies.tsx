import * as React from "react";
import * as styles from "./Currencies.scss";
import { useHistory } from "react-router-dom";
import { Carusel } from "../Carusel/Carusel";
import { Currency } from "../../store/currency/currency.types";
import {
  currentCurrencySelector,
  currenciesSelector
} from "../../store/currency/currency.selectors";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/currency/currency.actions";
import { balancesSelector } from "../../store/balances/balances.selectors";
import { getSign } from "../../store/currency/currency.helpers";
import { CaruselType } from "../Carusel/Carusel.types";

export interface CaruselItem {
  text: string | React.ReactNode;
  value: string;
}

const useStateSelectors = () => ({
  currentCurrency: useSelector(currentCurrencySelector),
  currencies: useSelector(currenciesSelector),
  balances: useSelector(balancesSelector)
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
  const history = useHistory();
  const list: CaruselItem[] = currencies.map((currency: Currency) => {
    return {
      text: `${balances[currency].toFixed(2)} ${getSign(currency)}`,
      value: currency
    };
  });
  const exchangeHandler = () => {
    history.push(`/exchange/${currentCurrency}`);
  };
  return (
    <>
      <Carusel
        list={list}
        active={currentCurrency}
        onChange={chooseCurrency}
        type={CaruselType.Circle}
        name="balances"
      />
      <div className={styles.buttons}>
        <button
          id="exchange-button"
          className={styles.exchange}
          onClick={exchangeHandler}
        />
      </div>
    </>
  );
};
