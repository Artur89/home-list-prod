import React, { Component } from 'react';
import { Link } from 'react-router';

class Pagination extends Component {

	render() {
		const { products, query } = this.props;
		const { offset = 0, limit = 20 } = query;
		let paginationPage = 0;

		return (
			<ul>
				{
					products.map((el, index) => {
						if(paginationPage < Math.floor(products.length / limit) && index >= (offset * limit)) {
							paginationPage++;
							return <Link activeClassName="is-active" to={"list?offset=" + (paginationPage * limit) + "&limit=" + limit} key={"pagination-" + paginationPage}>{paginationPage} </Link>;
						}
					})
				}
			</ul>
		)
	}

}

export default Pagination;