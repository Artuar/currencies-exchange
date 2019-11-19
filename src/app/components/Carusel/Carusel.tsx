import * as React from "react";
import * as styles from "./Carusel.scss";
import classNames from "classnames";
import { CaruselItem } from "../Currencies/Currencies";

interface Props {
  list: CaruselItem[];
  active: string;
  onChange(item: string): void;
}

export const Carusel: React.FunctionComponent<Props> = ({
  list,
  active,
  onChange,
}) => {
  const activePos = list.map(item => item.value).indexOf(active);
  const nextPos = activePos === list.length - 1 ? 0 : activePos + 1;
  return (
    <div className={classNames(styles.carusel, styles.circle)}>
      <div className={styles.items}>
        {list.map((item, index) =>
          <div key={item.value} className={classNames(styles.item, {
            [styles.current]: item.value === active,
            [styles.next]: index === nextPos,
         })}>
            {item.text}
          </div>
        )}
      </div>
      <div className={styles.slider}>
        {list.map((item, index) =>
          <button key={index}
               className={classNames(styles.point, {[styles.active]: index === activePos})}
               onClick={() => onChange(item.value)}
          />
        )}
      </div>
    </div>
  );
};
