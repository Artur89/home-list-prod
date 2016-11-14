import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

// Initial store state
let initialState = {
	home: {
		banner: {
			image: 'imageUrl',
			link: 'linkUrl'
		},
		offers: [
			{
				class: 'className',
				image: 'imageUrl',
				link: 'linkUrl'
			},
			{
				class: 'className',
				image: 'imageUrl',
				link: 'linkUrl'
			}
		]
	},
	list: {
		products: [
			{
				"__type":"type",
				"Opt":"",
				"Number":"2225A",
				"Name":"HP Thinkjet Printer",
				"Type":"printer"
			},
			{
				"__type":"type",
				"Opt":"",
				"Number":"2225B",
				"Name":"HP Thinkjet Printer",
				"Type":"printer"
			}
		]
	},
	product: {
		error: null,
		fetching: false,
		fetched: false,
		data: {
			"__type":"type",
			"Opt":"",
			"Number":"2225A",
			"Name":"HP Thinkjet Printer",
			"Type":"printer"
		}
	}
}

// Add middleware
let finalCreateStore = compose(
	applyMiddleware(thunk, logger())
)(createStore);

function configureStore(initialState = { home: {}, list: {}, product: {} }) {
	return finalCreateStore(rootReducer, initialState);
}

export default configureStore(initialState);