export default function product(product = {error: null,
		fetching: false,
		fetched: false,
	}, action) {

	switch(action.type) {
		case 'FETCH_PRODUCT':
			return Object.assign({}, product, {
				fetching: true
			});
			break;

		case 'FETCH_PRODUCT_REJECTED':
			return Object.assign({}, product, {
				fetching: false,
				error: action.payload
			});
			break;

		case 'FETCH_PRODUCT_FULFILLED':
			return Object.assign({}, product, {
				fetching: false,
				fetched: true,
				data: Object.assign({}, product.data, action.payload)
			});
			break;

		default:
			return product;
	}
}