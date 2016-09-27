let actions = {
	addTodo: function(text) {
		return {
			type: 'ADD_TODO',
			text: text
		}
	},
	toggleCompleted: function() {
		return {
			type: 'TOGGLE_COMPLETED'
		}
	}
}

export default actions