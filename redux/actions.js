import axios from "axios";

const actions = {

	fetchList: function(sel, page, limit) {
		return function(dispatch) {
			window.merchAllPages.loader.show();
			dispatch({type: 'FETCH_LIST'});
			axios.post('/data/list/' + sel + '/' + page + '/' + limit)
				.then((res) => {
					dispatch({type: 'FETCH_LIST_FULFILLED', 'payload': res.data});
					window.merchAllPages.loader.hide();
				})
				.catch((err) => {
					dispatch({type: 'FETCH_LIST_REJECTED', 'payload': err});
				});
		}
	},

	fetchProduct: function(num) {
		return function(dispatch) {
			window.merchAllPages.loader.show();
			dispatch({type: 'FETCH_PRODUCT'});
			axios.post('/data/product/' + num)
				.then((res) => {
					dispatch({type: 'FETCH_PRODUCT_FULFILLED', 'payload': res.data});
					window.merchAllPages.loader.hide();
				})
				.catch((err) => {
					dispatch({type: 'FETCH_PRODUCT_REJECTED', 'payload': err});
				});
		}
	}

}

export default actions;