import * as React from "react";
import { Currencies } from "./Currencies";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Currencies", () => {
  it("should render Currencies without throwing an error", () => {
    shallow(
      <Provider store={store}>
        <Currencies />
      </Provider>
    );
  });
});
