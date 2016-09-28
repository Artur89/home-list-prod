import React, { Component } from 'react'
import TodoItem from './TodoItem'

class TodoList extends Component {

	render() {
		return (
			<ul>
				{
					this.props.todos.map((todo) => {
						return <li key={todo.id}><TodoItem todo={todo} actions={this.props.actions} /></li>
					})
				}
			</ul>
		)
	}

}

export default TodoList