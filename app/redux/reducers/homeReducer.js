let home = function(home = {}, action) {
	switch(action.type) {
		case 'SET_OFFERS':
			return {
				home: {
					offers: action.offers
				}
			}
			break

		default:
			return home
	}
}

export default home