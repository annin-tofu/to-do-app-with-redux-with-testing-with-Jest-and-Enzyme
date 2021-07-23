import Congrats from "./Congrats";
import Enzyme, { shallow } from "enzyme";
// to make bridge between Jest and Enzyme
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";
import React from "react";
import { findByTestAttr, checkProps } from "./test/testUtils";

const defaultProps = { listComplete: false };

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Congrats {...setupProps} />);
};

test("renders without an error", () => {
  const wrapper = setup();
  const congratsComponent = findByTestAttr(wrapper, "component-congrats");
  expect(congratsComponent.length).toBe(1);
});

test("renders no text when `listComplete` prop is false", () => {
  const wrapper = setup({ listComplete: false });
  const congratsMessage = findByTestAttr(wrapper, "congrats-message");
  expect(congratsMessage.length).toBe(0);
});

test("renders no text when `listComplete` prop is true", () => {
  const wrapper = setup({ listComplete: true });
  const congratsMessage = findByTestAttr(wrapper, "congrats-message");
  expect(congratsMessage.length).toBe(1);
});

test("does not throw an error with the expected props", () => {
  const expectedProps = { listComplete: false };
  checkProps(Congrats, expectedProps);
});
