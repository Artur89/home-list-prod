// React
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

// Redux
import { Provider } from 'react-redux';
import store from '../redux/store';

// Router
import { syncHistoryWithStore } from 'react-router-redux';
const history = syncHistoryWithStore(hashHistory, store);

// Components
import Layout from '../components/Layout/Layout';
import Home from '../components/Home/Home';
import List from '../components/List/List';
import Product from '../components/Product/Product';

// Define routes
const routes = (
	<Route path="/" component={Layout}>
		<IndexRoute component={Home} />
		<Route path="list(/:sel)" name="list" component={List} />
		<Route path="product/:id" name="product" component={Product} />
	</Route>
)

render(
	<Provider store={store}>
		<Router history={history}>
			{ routes }
		</Router>
	</Provider>,
	document.getElementById('app')
)