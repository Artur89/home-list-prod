import axios from "axios";

const actions = {

	fetchList: function(sel) {
		return function(dispatch) {
			dispatch({type: 'FETCH_LIST'});
			axios.get('/listData.json')
				.then((res) => {
					dispatch({type: 'FETCH_LIST_FULFILLED', 'payload': res.data.d});
				})
				.catch((err) => {
					dispatch({type: 'FETCH_LIST_REJECTED', 'payload': err});
				});
		}
	},

	fetchProduct: function(id) {
		return function(dispatch) {
			dispatch({type: 'FETCH_PRODUCT'});
			axios.get('/productData.json')
				.then((res) => {
					dispatch({type: 'FETCH_PRODUCT_FULFILLED', 'payload': res.data});
				})
				.catch((err) => {
					dispatch({type: 'FETCH_PRODUCT_REJECTED', 'payload': err});
				});
		}
	}

}

export default actions;