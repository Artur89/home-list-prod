import React, { Component } from 'react'

class UserInfo extends Component {

	createNewUserId(event) {
		this.props.actions.createNewUserId()
	}

	createNewUserIdIfOdd(event) {
		this.props.actions.createNewUserIdIfOdd()
	}

	createNewUserIdAsync(event) {
		this.props.actions.createNewUserIdAsync()
	}

	render() {
		return (
			<div>
				<p>Login: {this.props.user.login}</p>
				<p>ID: {this.props.user.id}</p>
				<button onClick={this.createNewUserId.bind(this)}>Create new User ID</button>
				<button onClick={this.createNewUserIdIfOdd.bind(this)}>Create new User ID if odd</button>
				<button onClick={this.createNewUserIdAsync.bind(this)}>Create new User ID async</button>
			</div>
		)
	}

}

export default UserInfo