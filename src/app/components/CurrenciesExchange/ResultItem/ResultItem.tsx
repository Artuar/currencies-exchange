import * as React from "react";
import * as styles from "./ResultItem.scss";
import { Currency } from "app/store/currency/currency.types";
import { getSign } from "app/store/currency/currency.helpers";

interface Props {
  to: Currency;
  from: Currency;
  balance: number;
  result: number;
  rate: string;
}

export const ResultItem: React.FunctionComponent<Props> = ({
  to,
  from,
  balance,
  result,
  rate,
}) =>
  <>
  <div className={styles.currency}>
    <div className={styles.name}>
      { to }
    </div>
    <div className={styles.statement}>
      You have { getSign(to) } { balance.toFixed(2) }
    </div>
  </div>
  <div className={styles.details}>
    <div className={styles.sum}>
      { result.toFixed(2) }
    </div>
    <div className={styles.rate}>
      { getSign(to) }1 = { getSign(from) }{ rate }
    </div>
  </div>
  </>
