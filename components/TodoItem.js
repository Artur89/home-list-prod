import React, { Component } from 'react'

class TodoItem extends Component {

	handleComplete(event) {
		this.props.actions.toggleCompleted(this.props.todo.id)
	}

	handleDelete(event) {
		this.props.actions.deleteTodo(this.props.todo.id)
	}

	render() {
		return (
			<div>
				<p>{this.props.todo.text}</p>
				<button onClick={this.handleComplete.bind(this)}>Mark as completed</button>
				<button onClick={this.handleDelete.bind(this)}>Delete todo</button>
			</div>
		)
	}

}

export default TodoItem