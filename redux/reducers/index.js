import { combineReducers } from 'redux';

import home from './homeReducer';
import list from './listReducer';
import product from './productReducer';

export default combineReducers({
	home,
	list,
	product
});