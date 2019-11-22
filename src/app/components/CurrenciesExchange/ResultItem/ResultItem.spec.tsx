import * as React from "react";
import { ResultItem } from "./ResultItem";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { Currency } from "../../../store/currency/currency.types";

const mockStore = configureMockStore();
const store = mockStore({});

describe("ResultItem", () => {
  it("should render ResultItem without throwing an error", () => {
    shallow(
      <Provider store={store}>
        <ResultItem
          from={Currency.USD}
          balance={1}
          to={Currency.EUR}
          result={1}
          rate={"1"}
        />
      </Provider>
    );
  });
});
