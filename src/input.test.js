import Input from "./Input";
import Enzyme, { mount } from "enzyme";
import React from "react";
import { findByTestAttr, storeFactory } from "./test/testUtils";

const setup = (initialState = { listComplete: false }) => {
  const store = storeFactory(initialState);
  return mount(
    <Provider store={store}>
      <Input />
    </Provider>
  );
};

describe('statecontrolled input field',()=>{
    let originalUseState;
    let mockSetToDo=jest.fn();
    let wrapper;

beforeEach(()=> {
    mockSetToDo.mockClear();
    originalUseState = React.useState;
})
afterEach (()=>{
    React.useState=originalUseState;

})

    test('state updates with the value of input box on Change',()=>{
        React.useState=jest.fn(()=>["",mockSetToDo])
        wrapper=setup();const inputBox=findByTestAttr(wrapper, 'input-box');
        inputBox.simulate('change',{target:{value:"My first to do"}})
expect(mockSetToDo).toHaveBeenCalledWith("My first to do")
    })
    test("state updates with an empty string when the submit button is clicked" ()=>{

    })
})

test("an empty test", () => {});
