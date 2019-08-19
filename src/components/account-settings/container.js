import React, { Component, Fragment } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { Link, NavLink, Route, Switch } from 'react-router-dom';
import ChangePassword from './change-password/change-password';
import PinManagement from './pin-management';
// import Limit from './trans-limit/trans-limit'


class AccountSettings extends Component {



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
                                    <p className="page-title">Account Settings</p>
                                </div>
                                <div className="col-sm-12">
                                    <div>
                                        <div className="sub-tab-nav">
                                            <ul>
                                                <li><NavLink to={'/settings/change-password'}>Change Password</NavLink></li>
                                                <li><NavLink to={'/settings/pin-management'}>Alat Pin Management</NavLink></li>
                                                <li><NavLink to={'/settings/security-questions'}>Security Questions</NavLink></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {this.props.children}
                                <Route path={'/settings'} exact component={ChangePassword} />
                                <Route path={'/settings/change-password'} exact component={ChangePassword} />
                                <Route path={'/settings/pin-management'} component={PinManagement} />
                                {/* <Route path={'/account/account-statement'} component={Statement} /> */}
                                {/* <Route path={'/account/account-limit'} component={Limit} /> */}
                            </div>
                        </div>
                    </div>
                </InnerContainer>
            </Fragment>
        );
    }
}

export default AccountSettings;