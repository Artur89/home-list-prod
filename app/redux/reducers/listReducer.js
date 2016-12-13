export default function list(list = {error: null,
		fetching: false,
		fetched: false,
	}, action) {

	switch(action.type) {
		case 'FETCH_LIST':
			return Object.assign({}, list, {
				fetching: true
			});
			break;

		case 'FETCH_LIST_REJECTED':
			return Object.assign({}, list, {
				fetching: false,
				error: action.payload
			});
			break;

		case 'FETCH_LIST_FULFILLED':
			return Object.assign({}, list, {
				fetching: false,
				fetched: true,
				products: action.payload
			});
			break;

		default:
			return list;
	}
}