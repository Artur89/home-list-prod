import React, { Component } from 'react';
import { Link } from 'react-router';

class Pagination extends Component {

	getListChunk(num) {
		this.props.actions.fetchList('all', num)
	}

	render() {
		const { products, query } = this.props;
		const { data, pagination } = products;
		
		let arr = [];
		for(var i = pagination.first_page; i <= pagination.last_page; i++) {
			arr.push(<a onClick={this.getListChunk.bind(this, i)}>{i}</a>)
		}

		return (
			<ul>
				{ arr }
			</ul>
		)
	}

}

export default Pagination;