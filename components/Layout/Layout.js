import React, { Component } from 'react';
import { Link } from 'react-router';

import Header from './Header';
import Footer from './Footer';

class Layout extends Component {
	
	render() {
		return (
			<div className="layout">
				<Header router={this.props.router} />
				{this.props.children}
				<Footer />
			</div>
		);
	}

}

export default Layout;