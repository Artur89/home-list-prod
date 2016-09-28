let actions = {
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
	}
}


export default actions