import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../../redux/actions';

import Pagination from './Pagination';

class List extends Component {

	componentDidMount() {
		window.scrollTo(0, 0);
	}
	
	render() {
		const { fetchProduct } = this.props.actions;
		const { offset = 0, limit = 20 } = this.props.location.query;
		const goToProduct = (num) => {
			fetchProduct(num);
			this.props.router.push("/product/" + num);
		}
		let count = 0;

		return (
<div className="sm15">
	<div className="list">
		<div className="container">
			<div className="gr">
				<div className="gr__col gr__col--md-24">
					<h1>List</h1>
					<ul className="product-list">
						{
							this.props.list.products.map((el, i) => {
								if(i >= parseInt(offset) && i < (parseInt(offset) + parseInt(limit))) {
									count++;
									if(count == limit) {
										count = 0;
									}
									return (
										<li className="product" key={i}>
											<p>{el.Name}</p>
											<p>{el.Number}</p>
											<button onClick={goToProduct.bind(this, el.Number)}>See {el.Number} details</button>
										</li>
									)
								}
							})
						}
					</ul>
					<Pagination products={this.props.list.products} query={this.props.location.query} />
				</div>
			</div>
		</div>
	</div>
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