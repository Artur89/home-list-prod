import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

class Product extends Component {

	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		const product = this.props.product;

		return (
			<div className="sm15">
				<div className="product">
					<div className="container">
						<h1>Product</h1>
						<pre>{JSON.stringify(product.data, null, 2)}</pre>
					</div>
				</div>
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