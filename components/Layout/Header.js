import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {

	render() {
		return(
			<header>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="list">List</Link></li>
					<li><Link to="product">Product</Link></li>
				</ul>
			</header>
		)
	}

}

export default Header;