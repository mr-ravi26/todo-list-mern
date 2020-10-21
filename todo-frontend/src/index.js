import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import {  Route, Switch, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import reduxThunk from 'redux-thunk';
import reducers from './redux/reducers';
import { withRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import LoginTab from "./view/auth";
import NestedList from "./view/todo/todo";
import RequireAuth from './utils/require-auth';

import * as actionTypes from './redux/actions/types';
import customHistory from "./utils/history";


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers)
const userdata = localStorage.getItem('user');

if (userdata) {
  store.dispatch({
    type: actionTypes.GET_LOGIN_LOADED,
    payload: JSON.parse(userdata)
  })
}


ReactDOM.render(
    <Provider store={store}>
      <Router history={customHistory}>
        <App>
          <Switch>
            <Route path="/main" component={RequireAuth(withRouter(NestedList))} />
            <Route exact path="/" component={LoginTab} />
          </Switch>
        </App>
      </Router>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
