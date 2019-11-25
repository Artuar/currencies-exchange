import * as React from "react";
import { CurrenciesExchange } from "./CurrenciesExchange";
import { Provider } from "react-redux";
import { ReactWrapper, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import * as ReactReduxHooks from "react-redux";
import { ratesDefaultState } from "../../store/rates/rates.reducer";
import { balancesDefaultState } from "../../store/balances/balances.reducer";
import { currencyDefaultState } from "../../store/currency/currency.reducer";
import * as ratesActions from "../../store/rates/rates.actions";
import { Currency } from "../../store/currency/currency.types";

describe("CurrenciesExchange", () => {
  const mockStore = configureMockStore();
  let store = mockStore({});
  let component: ReactWrapper;
  const TEST_VALUE = "1";

  const mountComponent = () => {
    store = mockStore({
      currency: currencyDefaultState,
      balances: balancesDefaultState,
      rates: { ...ratesDefaultState, value: TEST_VALUE, rate: 2 }
    });

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <CurrenciesExchange />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => mountComponent());

  afterEach(() => {
    component.exists() && component.unmount();
  });

  it("should render cancel button", () => {
    expect(component.find("#cancel-button")).toHaveLength(1);
  });

  it("should render buttons for choosing main currency", () => {
    expect(component.find("#from-slider-wrapper button")).toHaveLength(3);
  });

  it("should render buttons for choosing result currency", () => {
    expect(component.find("#to-slider-wrapper button")).toHaveLength(2);
  });

  it("should exchange currency", () => {
    component.find(`#exchange-currency-button`).simulate("click");
    expect(store.getActions()[1]).toMatchObject(
      ratesActions.exchange(+TEST_VALUE)
    );
  });

  it("should change from currency", () => {
    const TEST_CURRENCY_INDEX = 1;
    component
      .find(`#from-slider-button-${TEST_CURRENCY_INDEX}`)
      .simulate("click");
    expect(store.getActions()[1]).toEqual(
      ratesActions.setCurrencies({ from: Currency.USD, to: Currency.EUR })
    );
  });

  it("should change to currency", () => {
    const TEST_CURRENCY_INDEX = 1;
    component
      .find(`#from-slider-button-${TEST_CURRENCY_INDEX}`)
      .simulate("click");
    expect(store.getActions()[1]).toEqual(
      ratesActions.setCurrencies({ from: Currency.USD, to: Currency.EUR })
    );
  });

  it("should change value", () => {
    const TEST_VALUE = "3";
    component
      .find("#currency-value-GBP")
      .simulate("change", { target: { value: TEST_VALUE } });
    expect(store.getActions()[1]).toEqual(ratesActions.setValue(TEST_VALUE));
  });
});
