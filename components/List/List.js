import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../redux/actions';

class List extends Component {
	
	render() {
		const { fetchProduct } = this.props.actions;

		return (
			<div className="list">
				<h1>List</h1>
				<ul>
					{
						this.props.list.products.map((el, i) => {
							return (
								<li key={i}>
									<p>{el.Number}</p>
									<p><Link to="product" onClick={fetchProduct}>Get product</Link></p>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}

}

function mapStateToProps(state) {
	return {
		list: state.list
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(List);