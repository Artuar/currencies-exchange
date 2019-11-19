import * as React from "react";
import { AppComponent } from "./App";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe("App", () => {
  it("should render AppComponent without throwing an error", () => {
    shallow(
      <Provider store={store}>
        <AppComponent />
      </Provider>
    );
  });
});
