let getId = function(todos) {
	return todos.reduce((maxId, todo) => {
		return Math.max(todo.id, maxId)
	}, -1) + 1
}

let todoReducer = function(todos = [], action) {
	switch(action.type) {
		case 'ADD_TODO':
			return [{
				text: action.text,
				completed: false,
				id: getId(todos)
			}, ...todos]
			break

		case 'TOGGLE_COMPLETED':
			return todos.map((todo) => {
					return todo.id === action.id ? Object.assign({}, todo, {completed: !todo.completed}) : todo
				})
			break

		case 'DELETE_TODO':
			return todos.filter((todo) => { 
					return todo.id !== action.id
				})
			break

		default:
			return todos
	}
}

export default todoReducer