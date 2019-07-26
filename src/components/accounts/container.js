import React, { Component } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Fragment } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import History from './history/history';


class Accounts extends Component {



    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <InnerContainer>
                    <div className="dashboard-wrapper">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <p className="page-title">Accounts</p>
                                </div>
                                <div className="col-sm-12">
                                    <div>
                                        <div className="sub-tab-nav">
                                            <ul>
                                                <li><NavLink to={'/accounts/accounts-history'}>History</NavLink></li>
                                                <li><NavLink to={'/accounts/accounts-statement'}>Get Statement</NavLink></li>
                                                <li><NavLink to={'/accounts/accounts-limits'}>Account LImit</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {this.props.children}
                                <Route path={'/accounts' || '/accounts/accounts-history'} component={History} />
                                
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default Accounts;