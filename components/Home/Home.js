import React, { Component } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class Home extends Component {
	
	render() {
		const { fetchList } = this.props.actions;

		return (
			<div className="sm15">
				<div className="home">
					<div className="container">
						<h1>Homest</h1>
						<Link to="list" onClick={fetchList}>Get list</Link>
					</div>
				</div>
			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		home: state.home
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);