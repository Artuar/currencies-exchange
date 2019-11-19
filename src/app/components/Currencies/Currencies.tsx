import * as React from "react";
import * as styles from "./Currencies.scss";
import { Link } from "react-router-dom";
import { Carusel } from "../Carusel/Carusel";
import { Currency } from "app/store/currency/currency.reducer";
import { currentCurrencySelector } from "app/store/currency/currency.selector";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/currency/currency.actions";

export interface CaruselItem {
  text: string | React.ReactNode;
  value: string;
}

const useStateSelectors = () => ({
  currentCurrency: useSelector(currentCurrencySelector)
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    chooseCurrency: (currency: Currency) =>
      dispatch(actions.chooseCurrency(currency))
  };
};

export const Currencies: React.FunctionComponent = () => {
  const { currentCurrency } = useStateSelectors();
  const { chooseCurrency } = useDispatchActions();
  const list: CaruselItem[] = [
    {text: '10.00 $', value: Currency.USD},
    {text: '20.00 €', value: Currency.EUR},
    {text: '30.00 £', value: Currency.GBP},
  ];
  return (
    <>
      <Carusel list={list} active={currentCurrency} onChange={chooseCurrency}/>
      <div className={styles.buttons}>
        <Link to="/exchange">
          <button className={styles.exchange}/>
        </Link>
      </div>
    </>
  );
};
