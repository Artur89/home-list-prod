import React, { Component } from 'react'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import { connect } from 'react-redux'

class App extends Component {
	
	render() {
		return (
			<div className="app">
				<h1>Todo list</h1>
				<TodoInput dispatch={this.props.dispatch}></TodoInput>
				<TodoList todos={this.props.todos}></TodoList>
			</div>
		)
	}

}

function mapStateToProps(state) {
	return state
}

export default connect(mapStateToProps)(App)