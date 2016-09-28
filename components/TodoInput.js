import React, { Component } from 'react'

class TodoInput extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			inputText: ''
		}
	}

	handleChange(event) {
		this.setState({
			inputText: event.target.value
		})
	}

	handleSubmit(event) {
		event.preventDefault()
		this.props.actions.addTodo(this.state.inputText)
		this.state.inputText = ''
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input
						type="text"
						placeholder="Type in your todo"
						value={this.state.inputText}
						onChange={this.handleChange.bind(this)} />
					<button type="submit">Save</button>
				</form>
			</div>
		)
	}

}

export default TodoInput