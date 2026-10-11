import React from "react";
import { createRouteDispatcher } from "../route-dispatcher";
import { RouteLink, RouteProvider, withRoute } from "../provider-api";
import { createFakeWindow, createLocation } from "./test-utils";
const { act, fireEvent, render, screen } = require("@testing-library/react");

const routesConfig = [
  ["/foo", "foo", {}],
  ["/bar/:id", "bar", {}],
];

describe("RouteProvider and helpers", () => {
  test("RouteProvider gives RouteLink correct info", () => {
    // given
    const _window = createFakeWindow("/foo");
    const routeDispatcher = createRouteDispatcher(routesConfig, _window);
    render(
      <RouteProvider routeDispatcher={routeDispatcher}>
        <RouteLink routeName="bar" params={{ id: "foo" }} />
      </RouteProvider>
    );
    // when
    const href = screen.getByRole("link").getAttribute("href");
    // then
    expect(href).toEqual("/bar/foo");
  });

  test("RouteLink calls dispatcher.receiveRoute on click", () => {
    // given
    const _window = createFakeWindow("/foo");
    const routeDispatcher = createRouteDispatcher(routesConfig, _window);
    let received = null;
    routeDispatcher.receiveRoute = route => {
      received = route;
    };
    render(
      <RouteProvider routeDispatcher={routeDispatcher}>
        <RouteLink routeName="bar" params={{ id: "foo" }} />
      </RouteProvider>
    );
    // when
    fireEvent.click(screen.getByRole("link"));
    // then
    expect(received).toEqual({ routeName: "bar", id: "foo" });
  });

  test.skip("withRoute", () => {
    // given
    const DummyWithRoute = withRoute(({ route, children }) => {
      return (
        <div>
          <span className="route">{JSON.stringify(route)}</span>
          <span className="children">{children}</span>
        </div>
      );
    });
    const _window = createFakeWindow("/foo");
    const routeDispatcher = createRouteDispatcher(routesConfig, _window);

    render(
      <RouteProvider routeDispatcher={routeDispatcher}>
        <DummyWithRoute>children text</DummyWithRoute>
      </RouteProvider>
    );
    // when

    let routeText = screen.getByText(/route/).textContent;
    const childrenText = screen.getByText("children text").textContent;
    // then
    expect(routeText).toEqual(JSON.stringify({ routeName: "foo" }));
    expect(childrenText).toEqual("children text");

    act(() => routeDispatcher.receiveLocation(createLocation("/bar/foo")));
    routeText = screen.getByText(/route/).textContent;
    // then
    expect(routeText).toEqual(JSON.stringify({ id: "foo", routeName: "bar" }));
  });
});
