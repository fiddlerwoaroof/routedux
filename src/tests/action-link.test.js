import { _internal } from "../action-link";
import React from "react";
import PropTypes from "prop-types";
const { fireEvent, render, screen } = require("@testing-library/react");

const _Link = _internal.ActionLink(React, PropTypes);

it("dispatches an action on click", () => {
  // given
  const store = {
    pathForAction: jest.fn(() => "/my/path"),
    dispatch: jest.fn(),
  };
  const props = {
    action: { type: "ACTION", id: "123" },
    children: "Hello World!",
  };
  class Link extends _Link {
    constructor(props) {
      super(props);
      this.store = store;
    }
  }

  render(<Link {...{ ...props, store }} />);
  fireEvent.click(screen.getByRole("link"));

  //then
  expect(store.pathForAction.mock.calls).toEqual([
    [{ type: "ACTION", id: "123" }],
  ]);
  expect(store.dispatch.mock.calls).toEqual([[{ type: "ACTION", id: "123" }]]);
});

it("renders the url calculated by our internal function", () => {
  // given
  const store = {
    pathForAction: jest.fn(() => "/my/path"),
    dispatch: jest.fn(),
  };
  const props = {
    action: {},
    children: "Hello World!",
  };

  class Link extends _Link {
    constructor(props) {
      super(props);
      this.store = store;
    }
  }

  render(<Link {...{ ...props, store }} />);

  expect(screen.getByRole("link").getAttribute("href")).toEqual("/my/path");
  expect(screen.getByText("Hello World!")).toBeTruthy();
});

it("additional props are passed through", () => {
  // given
  const store = {
    pathForAction: jest.fn(() => "/my/path"),
    dispatch: jest.fn(),
  };
  const props = {
    action: {},
    children: "Hello World!",
    className: "foo",
  };

  class Link extends _Link {
    constructor(props) {
      super(props);
      this.store = store;
    }
  }

  render(<Link {...{ ...props, store }} />);

  expect(screen.getByRole("link").getAttribute("class")).toEqual("foo");
});
