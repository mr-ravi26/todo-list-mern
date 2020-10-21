import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import rootReducer from '../reducers';

export const history = createHistory();

export const configureStore = (initialState = {}) => {
	const historyRouterMiddleware = routerMiddleware(history);
	const loggerMiddleware = createLogger();

	const enhancers = [];
	const middleware = [
		thunk,
		loggerMiddleware,
		historyRouterMiddleware
	];

	if (process.env.NODE_ENV === 'development') {
		const devToolsExtension = window.devToolsExtension;

		if (typeof devToolsExtension === 'function') {
			enhancers.push(devToolsExtension());
		}
	}

	const composedEnhancers = compose(
		applyMiddleware(...middleware),
		...enhancers
	);

	const store = createStore(
		rootReducer,
		initialState,
		composedEnhancers
	);

	return store;

};
