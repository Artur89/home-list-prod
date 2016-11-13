import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class Product extends Component {

	render() {
		const product = this.props.product;

		return (
			<div className="product">
				<h1>Product</h1>
				<p>ID: {product.data.id}</p>
			</div>
		)
	}

}

function mapStateToProps(state) {
	return {
		product: state.product
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);