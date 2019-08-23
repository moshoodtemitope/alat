import React, { Component, Fragment } from 'react';
import InnerContainer from '../../shared/templates/inner-container';
import { NavLink, Route } from 'react-router-dom';
import ChangePassword from './change-password/change-password';
import PinManagement from './pin-management';
import ChangeSecurityQuestion from './pin-management/change-pin/change-security-question'
import ForgotSecurityQuestion from './pin-management/forgot-pin/forgot-security-question'
import ChangePin from './pin-management/change-pin/change-pin'
import VerifyOtp from './pin-management/forgot-pin/verify-otp'
import ForgotPin from './pin-management/forgot-pin/forgot-pin'
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
                                <Route path={'/settings/change-password'}  component={ChangePassword} />


                                <Route path={'/settings/pin-management'} exact  component={PinManagement} />

                                <Route path={'/settings/pin-management/change/security-question'}  component={ChangeSecurityQuestion} />
                                <Route path={'/settings/pin-management/change/change-pin'}  component={ChangePin} />

                                <Route path={'/settings/pin-management/forgot/forgot-pin'}  component={ForgotPin} />
                                <Route path={'/settings/pin-management/forgot/security-question'}  component={ForgotSecurityQuestion} />
                                <Route path={'/settings/pin-management/forgot/verify-otp'}  component={VerifyOtp} />
                                
                                
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