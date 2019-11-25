import * as React from "react";
import * as styles from "./Carusel.scss";
import classNames from "classnames";
import { CaruselItem } from "../Currencies/Currencies";
import { CaruselType } from "./Carusel.types";

interface Props {
  list: CaruselItem[];
  active: string;
  onChange(item: string): void;
  type: CaruselType;
  name: string;
}

export const Carusel: React.FunctionComponent<Props> = ({
  list,
  active,
  onChange,
  type,
  name
}) => {
  const activePos = list.map(item => item.value).indexOf(active);
  const nextPos = activePos === list.length - 1 ? 0 : activePos + 1;
  return (
    <div className={classNames(styles.carusel, styles[type])}>
      <div className={styles.items} id={`${name}-carusel-items`}>
        {list.map((item, index) => (
          <div
            key={item.value}
            className={classNames(styles.item, {
              [styles.current]: item.value === active,
              [styles.next]: index === nextPos
            })}
          >
            <div className={styles.textWrapper}>{item.text}</div>
          </div>
        ))}
      </div>
      <div className={styles.slider} id={`${name}-slider-wrapper`}>
        {list.map((item, index) => (
          <button
            id={`${name}-slider-button-${index}`}
            key={index}
            className={classNames(styles.point, {
              [styles.active]: index === activePos
            })}
            onClick={() => onChange(item.value)}
          />
        ))}
      </div>
    </div>
  );
};
