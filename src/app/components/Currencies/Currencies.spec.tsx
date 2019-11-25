import * as React from "react";
import { Currencies } from "./Currencies";
import { Provider } from "react-redux";
import { ReactWrapper, mount } from "enzyme";
import configureMockStore from "redux-mock-store";
import * as ReactReduxHooks from "react-redux";
import { currencyDefaultState, CurrencyState } from "../../store/currency/currency.reducer";
import { balancesDefaultState, BalancesState } from "../../store/balances/balances.reducer";
import { BrowserRouter } from "react-router-dom";
import * as currencyActions from "../../store/currency/currency.actions";
import { Currency } from "../../store/currency/currency.types";

describe("Currencies", () => {
  const mockStore = configureMockStore();
  let store = mockStore({});
  let component: ReactWrapper;

  const mountComponent = (initialState: Partial<CurrencyState & BalancesState> = {}) => {
    store = mockStore({ currency: currencyDefaultState, balances: balancesDefaultState, ...initialState });

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Currencies />
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => mountComponent());

  afterEach(() => {
    component.exists() && component.unmount();
  });

  it("should render buttons for choosing currency", () => {
    expect(component.find("#balances-slider-wrapper button")).toHaveLength(3);
  });

  it("should render all balances", () => {
    expect(component.find("#balances-carusel-items > *")).toHaveLength(3);
  });

  it("should change currency", () => {
    const TEST_CURRENCY_INDEX = 1;
    component.find(`#balances-slider-button-${TEST_CURRENCY_INDEX}`).simulate("click");
    expect(store.getActions()).toEqual([
      currencyActions.chooseCurrency(Currency.USD)
    ]);
  });

  it("should render exchange button", () => {
    mountComponent();
    expect(component.find("#exchange-button")).toHaveLength(1);
  });
});
