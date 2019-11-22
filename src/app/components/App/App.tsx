import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as styles from "./App.scss";
import { Currencies } from "../Currencies/Currencies";
import { CurrenciesExchange } from "../CurrenciesExchange/CurrenciesExchange";

export const AppComponent: React.FunctionComponent = () => {
  return (
    <Router>
      <div className={styles.content}>
        <Switch>
          <Route exact path="/">
            <Currencies />
          </Route>
          <Route path="/exchange/:currency">
            <CurrenciesExchange />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
