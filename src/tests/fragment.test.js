import React from "react";
import Fragment from "../fragment";
const { render, screen } = require("@testing-library/react");

it("should display when state is truthy", () => {
  // given
  const state = { property: true };
  // when

  render(
    <Fragment state={state} filterOn="property">
      <div>Hello</div>
    </Fragment>
  );

  // then
  expect(screen.getByText("Hello")).toBeTruthy();
});

it("should not display when state is falsy", () => {
  // given
  const state = { property: undefined };
  // when

  render(
    <Fragment state={state} filterOn="property">
      <div>Hello</div>
    </Fragment>
  );

  // then
  expect(screen.queryByText("Hello")).toBeNull();
});

it("should handle paths in the state tree", () => {
  // given
  const state = { property: { subproperty: true } };
  // when

  render(
    <Fragment state={state} filterOn="property.subproperty">
      <div>Hello</div>
    </Fragment>
  );

  // then
  expect(screen.getByText("Hello")).toBeTruthy();
});

it("should handle arrays in the state tree", () => {
  // given
  const state = { property: [{ bar: {} }] };
  // when

  render(
    <Fragment state={state} filterOn="property.0.bar">
      <div>Hello</div>
    </Fragment>
  );

  // then
  expect(screen.getByText("Hello")).toBeTruthy();
});

it("should be falsy if missing state tree", () => {
  // given
  const state = { property: { subproperty: true } };

  render(
    <Fragment state={state} filterOn="property.missingproperty.something">
      <div>Hello</div>
    </Fragment>
  );

  expect(screen.queryByText("Hello")).toBeNull();
});
