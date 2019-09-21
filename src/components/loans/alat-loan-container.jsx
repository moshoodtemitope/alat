import React, { Component } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Fragment } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import AlatLoanDashboard from './alat-loans/index-active';
import LiquidateLoan from './alat-loans/liquidate-loan';


class AlatLoanContainer extends Component {



    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <div className="col-sm-12">
                    <p className="page-title">Loans</p>
                </div>
                <div className="col-sm-12">
                    <div>
                        <div className="sub-tab-nav">
                            <ul>
                                <li><NavLink to={'/loans/alat-loans/liquidate'}>Active Loans</NavLink></li>
                                <li><NavLink to={'/loans/alat-loans/past-loans'}>Past Loans</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {this.props.children}
                {/* <Route exact path={'/loans/alat-loans'} component={AlatLoanDashboard} /> */}
                {/* <Route path={'/loans/alat-loans/past-loans'} component={Statement} /> */}
                {/* <Route path={'/loans/alat-loans/liquidate'} component={LiquidateLoan} /> */}
            </Fragment>
        );
    }
}

export default AlatLoanContainer;