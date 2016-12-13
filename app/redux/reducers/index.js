import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import home from './homeReducer';
import list from './listReducer';
import product from './productReducer';

export default combineReducers({
	routing: routerReducer,
	home,
	list,
	product
});