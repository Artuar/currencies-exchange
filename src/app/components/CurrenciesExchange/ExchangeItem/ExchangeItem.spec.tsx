import * as React from "react";
import { ExchangeItem } from "./ExchangeItem";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Currency } from "../../../store/currency/currency.types";

const mockStore = configureMockStore();
const store = mockStore({});

describe("ExchangeItem", () => {
  it("should render ExchangeItem without throwing an error", () => {
    shallow(
      <Provider store={store}>
        <ExchangeItem
          from={Currency.USD}
          balance={1}
          value={""}
          active={false}
          onChange={() => {}}
        />
      </Provider>
    );
  });
});
