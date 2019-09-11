import React, { Component } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Fragment } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import AlatLoanDashboard from './alat-loans/index-active';


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
                                <li><NavLink to={'/loans/alat-loans'}>Active Loans</NavLink></li>
                                <li><NavLink to={'/loans/alat-loans/past-loans'}>Past Loans</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {this.props.children}
                <Route path={'/loans/alat-loans'} exact component={AlatLoanDashboard} />
                {/* <Route path={'/loans/alat-loans/past-loans'} component={Statement} /> */}
            </Fragment>
        );
    }
}

export default AlatLoanContainer;