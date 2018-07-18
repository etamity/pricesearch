import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import reducers from 'Reducers';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import AppContainer from 'AppContainer';

const history = createBrowserHistory();
const middleware = routerMiddleware(history)

export const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

const App = () =>
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path="/" name="App Container" component={AppContainer}/>
      </Switch>
    </HashRouter>
  </Provider>

export default App;
