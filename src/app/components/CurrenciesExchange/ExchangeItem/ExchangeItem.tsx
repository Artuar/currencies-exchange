import * as React from "react";
import * as styles from "./ExchangeItem.scss";
import { Currency } from "app/store/currency/currency.types";
import { getSign } from "app/store/currency/currency.helpers";
import { useEffect, useRef } from "react";

interface Props {
  from: Currency;
  balance: number;
  value: string;
  onChange(value: string): void;
  active: boolean;
}

export const ExchangeItem: React.FunctionComponent<Props> = ({
  from,
  balance,
  value,
  onChange,
  active,
}) => {
  const field: React.Ref<HTMLInputElement> = useRef(null);
  const onChangeHandler = (value: string) => {
    const formated = value.replace(/[^\d.]/g, '');
    if(isNaN(+formated)) {
      return;
    }
    if (formated.slice(-4, -3) === '.') {
      return;
    }
    if(+formated > balance) {
        onChange(balance.toString());
        return;
    }
    onChange(formated);
  }

  useEffect(() => {
    const {current } = field;
    current && active && current.focus();
  });

  return <>
    <div className={styles.currency}>
      <div className={styles.name}>
        { from }
      </div>
      <div className={styles.statement}>
        You have { getSign(from) } { balance.toFixed(2) }
      </div>
    </div>
    <div className={styles.sum}>
      <input type="text"
             ref={field}
             maxLength={9}
             className={styles.input}
             onChange={event => onChangeHandler(event.target.value)}
             value={value}
      />
    </div>
  </>
}
