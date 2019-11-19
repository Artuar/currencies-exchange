import * as React from "react";
import * as styles from "./CurrenciesExchange.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

export const CurrenciesExchange: React.FunctionComponent = () => {
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
                  EUR
                </div>
                <div className={styles.statement}>
                  You have € 10.00
                </div>
              </div>
              <div className={styles.sum}>
                <input type="text" className={styles.input}/>
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
                USD
              </div>
              <div className={styles.statement}>
                You have $ 20.00
              </div>
            </div>
            <div className={styles.details}>
              <div className={styles.sum}>
                44.00
              </div>
              <div className={styles.rate}>
                $1 = €0.9
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
