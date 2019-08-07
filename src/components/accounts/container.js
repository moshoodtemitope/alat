import React, { Component } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Fragment } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import History from './history/history';
import Statement from './statement/statement';
import Limit from './trans-limit/trans-limit'


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
                                                <li><NavLink to={'/account/account-history'}>History</NavLink></li>
                                                <li><NavLink to={'/account/account-statement'}>Get Statement</NavLink></li>
                                                <li><NavLink to={'/account/account-limit'}>Account LImit</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {this.props.children}
                                <Route path={'/account'} exact component={History} />
                                <Route path={'/account/account-history'} component={History} />
                                <Route path={'/account/account-statement'} component={Statement} />
                                <Route path={'/account/account-limit'} component={Limit} />
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default Accounts;