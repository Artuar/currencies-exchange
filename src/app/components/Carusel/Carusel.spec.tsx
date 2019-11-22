import * as React from "react";
import { Carusel } from "./Carusel";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import { CaruselType } from "./Carusel.types";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Carusel", () => {
  it("should render Carusel without throwing an error", () => {
    shallow(
      <Provider store={store}>
        <Carusel
          list={[
            { value: "1", text: "1" },
            { value: "2", text: "2" }
          ]}
          active="1"
          onChange={() => {}}
          type={CaruselType.Flat}
        />
      </Provider>
    );
  });
});
