import React, { Component } from 'react'

class UserInfo extends Component {

	handleClick(event) {
		this.props.actions.createNewUserId()
	}

	render() {
		return (
			<div>
				<p>Login: {this.props.user.login}</p>
				<p>ID: {this.props.user.id}</p>
				<button onClick={this.handleClick.bind(this)}>Click</button>
			</div>
		)
	}

}

export default UserInfo