import { createActionDispatcher } from "./action-router";

function buildMiddleware(actionDispatcher) {
  return _ => next => action => {
    actionDispatcher.receiveAction(action);

    return next(action);
  };
}

function enhanceStoreFactory(actionDispatcher) {
  return function enhanceStore(nextStoreCreator) {
    const middleware = buildMiddleware(actionDispatcher);

    return (reducer, finalInitialState, enhancer) => {
      const theStore = nextStoreCreator(reducer, finalInitialState, enhancer);

      actionDispatcher.addActionListener(action => theStore.dispatch(action));

      theStore.pathForAction =
        actionDispatcher.pathForAction.bind(actionDispatcher);

      theStore.dispatch = middleware(theStore)(
        theStore.dispatch.bind(theStore)
      );
      return theStore;
    };
  };
}

export default function installBrowserRouter(routesConfig, _window = window) {
  const actionDispatcher = createActionDispatcher(routesConfig, _window);

  return {
    enhancer: enhanceStoreFactory(actionDispatcher),
    init: actionDispatcher.init.bind(actionDispatcher),
    _actionDispatcher: actionDispatcher,
  };
}
