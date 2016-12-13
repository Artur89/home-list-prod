import React, { Component } from 'react';
import { Link } from 'react-router';

class BreadCrumbs extends Component {
    
    render() {
        const goBack = () => {
            this.props.router.goBack();
        }
        return (
<div id="customBreadCrumbs">
    
    <div id="customBreadCrumbs">
        <div id="user-actions-wrapper">

            <div className="sm15">
                <div className="breadcrumbs">
                    <div className="container">
                        <div className="gr">
                            <div className="gr__col gr__col--md-24">
                                <div className="breadcrumbs__back-btn">
                                    <a onClick={goBack} className="breadcrumbs-back-btn">Back</a>
                                </div>
                                <div className="breadcrumbs__list">
                                    <ul className="breadcrumbs-list">
                                        
                                        <li typeof="v:Breadcrumb" className="breadcrumbs-list__i">
                                          <a title="Store Home" rel="v:url" property="v:title" href="http://store.hp.com/UKStore/default.aspx">Store Home</a>
                                        </li>
          
                                        <li typeof="v:Breadcrumb" className="breadcrumbs-list__i breadcrumbs-list__i--last">
                                          <a title="Laptops" rel="v:url" property="v:title" href="http://store.hp.com/UKStore/Merch/list.aspx?sel=NTB">Laptops</a>
                                        </li>
          
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>
        
</div>
        );
    }

}

export default BreadCrumbs;