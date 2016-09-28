let getId = function(state) {
	return state.todos.reduce((maxId, todo) => {
		return Math.max(todo.id, maxId)
	}, -1) + 1
}

let reducer = function(state, action) {
	switch(action.type) {
		case 'ADD_TODO':
			return Object.assign({}, state, {
				todos: [{
					text: action.text,
					completed: false,
					id: getId(state)
				}, ...state.todos]
			})
			break

		case 'TOGGLE_COMPLETED':
			return Object.assign({}, state, {
				todos: state.todos.map((todo) => {
					return todo.id === action.id ? Object.assign({}, todo, {completed: !todo.completed}) : todo
				})
			})
			break

		case 'DELETE_TODO':
			return Object.assign({}, state, {
				todos: state.todos.filter((todo) => { 
					return todo.id !== action.id
				})
			})
			break

		case 'CREATE_USER_ID':
			return Object.assign({}, state, {
				user: {
					login: state.user.login,
					id: action.id
				}
			})
			break

		default:
			return state
	}
}

export default reducer