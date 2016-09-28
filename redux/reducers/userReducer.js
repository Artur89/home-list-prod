let userReducer = function(user = {}, action) {
	switch(action.type) {
		case 'CREATE_USER_ID':
			return {
				login: user.login,
				id: action.id
			}
			break

		default:
			return user
	}
}

export default userReducer