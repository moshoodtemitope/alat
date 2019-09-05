import React, { Component } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Fragment } from 'react';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import History from './history/history';
import Statement from './statement/statement';
import Limit from './trans-limit/trans-limit'


class AlatLoanContainer extends Component {



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
                                <Route path={'/loans/alat-loans'} exact component={History} />
                                <Route path={'/loans/alat-loans/past-loans'} component={Statement} />
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default AlatLoanContainer;