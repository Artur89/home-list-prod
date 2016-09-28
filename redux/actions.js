let actions = {
	// todos
	addTodo: function(text) {
		return {
			type: 'ADD_TODO',
			text: text
		}
	},

	toggleCompleted: function(id) {
		return {
			type: 'TOGGLE_COMPLETED',
			id: id
		}
	},

	deleteTodo: function(id) {
		return {
			type: 'DELETE_TODO',
			id: id
		}
	},

	createNewUserId: function() {
		return {
			type: 'CREATE_USER_ID',
			id: Math.round(Math.random() * 100)
		}
	},

	// user
	createNewUserIdIfOdd: function() {
		return (dispatch, getState) => {
			const { user } = getState()

			if(user.id % 2 === 0) {
				return;
			}

			dispatch(actions.createNewUserId())
		}
	},

	createNewUserIdAsync: function() {
		return(dispatch) => {
			setTimeout(() => {
				dispatch(actions.createNewUserId())
			}, 1000)
		}
	}
}


export default actions