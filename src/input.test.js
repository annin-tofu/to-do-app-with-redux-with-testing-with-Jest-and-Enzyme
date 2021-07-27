import Input from "./Input";
import { mount, shallow } from "enzyme";
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

describe("state controlled input field", () => {
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

  test("state updates with the value of input box on change", () => {
    React.useState = jest.fn(() => ["", mockSetToDo]);
    wrapper = setup();
    const inputBox = findByTestAttr(wrapper, "input-box");
    // console.log(inputBox.debug())
    const mockOnChangeEvent = { target: { value: "My first to-Do" } };
    inputBox.simulate("change", mockOnChangeEvent);
    expect(mockSetToDo).toHaveBeenCalledWith("My first to-Do");
  });

  test("state updates with an empty string when the submit button is clicked", () => {
    React.useState = jest.fn((initialState) => [initialState, mockSetToDo]);
    const wrapper = setup();
    const submitButton = findByTestAttr(wrapper, "submit-button");
    submitButton.simulate("click", { preventDefault() {} });
    expect(mockSetToDo).toHaveBeenCalledWith("");
  });
});

//2:46
describe("render", () => {
  describe("listComplete prop is true", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ listComplete: true });
    });
    test("Input components renders without an error", () => {
      const inputComponent = findByTestAttr(wrapper, "component-input");
      expect(inputComponent.exists()).toBe(true);
    });
    test("Input text box does not render", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toBe(false);
    });
    test("Submit button does not render", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(false);
    });
  });
  describe("listComplete state is false", () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ listComplete: false });
    });
    test("Input renders without error", () => {
      const inputComponent = findByTestAttr(wrapper, "component-input");
      expect(inputComponent.exists()).toBe(true);
    });
    test("Input box does not exist", () => {
      const inputBox = findByTestAttr(wrapper, "input-box");
      expect(inputBox.exists()).toBe(true);
    });
    test("Submit Button does not exist", () => {
      const submitButton = findByTestAttr(wrapper, "submit-button");
      expect(submitButton.exists()).toBe(true);
    });
  });
});
