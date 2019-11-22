import * as React from "react";
import { CurrenciesExchange } from "./CurrenciesExchange";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe("CurrenciesExchange", () => {
  it("should render CurrenciesExchange without throwing an error", () => {
    shallow(
      <Provider store={store}>
        <CurrenciesExchange />
      </Provider>
    );
  });
});
