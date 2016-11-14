import axios from "axios";

const actions = {

	fetchList: function(sel) {
		return function(dispatch) {
			window.merchAllPages.loader.show();
			dispatch({type: 'FETCH_LIST'});
			axios.get('/listData.json')
				.then((res) => {
					dispatch({type: 'FETCH_LIST_FULFILLED', 'payload': res.data.d});
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
			axios.get('/products/'+num+'.json')
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