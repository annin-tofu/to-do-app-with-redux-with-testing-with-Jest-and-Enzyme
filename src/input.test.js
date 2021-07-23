import Input from "./Input";
import Enzyme, { mount } from "enzyme";
import React from "react";
import { findByTestAttr, storeFactory } from "./test/testUtils";
import { Provider } from "react-redux";

const setup = (initialState = { listComplete: false }) => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Input />
    </Provider>
  );
};

describe("statecontrolled input field", () => {
  let originalUseState;
  let mockSetToDo = jest.fn();
  let wrapper;

  beforeEach(() => {
    mockSetToDo.mockClear();
    originalUseState = React.useState;
  });
  afterEach(() => {
    React.useState = originalUseState;
  });

  test("state updates with the value of input box on Change", () => {
    React.useState = jest.fn(() => ["", mockSetToDo]);
    wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");
    inputBox.simulate("change", { target: { value: "My first to do" } });
    expect(mockSetToDo).toHaveBeenCalledWith("My first to do");
  });

  test.skip("state updates with an empty string when the submit button is clicked", () => {});
});

//2:46
describe("rendering", () => {
  describe("listComplete prop is true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ listComplete: true });
    });
    test("Input components renders without an error", () => {
      const inputComponent = findByTestAttr(wrapper, "component-input");
      expect(inputComponent.length).toBe(1);
    });
    test("Input text box does not render", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.length).toBe(0);
    });
    test("Submit button does not render", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.length).toBe(0);
    });
  });
  describe.skip("listComplete state is false", () => {});
});
