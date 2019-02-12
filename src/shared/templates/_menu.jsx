import * as React from 'react';
import {HashRouter, NavLink} from 'react-router-dom';
import {history} from "../../_helpers";
import {Router} from "react-router";


class MenuContainer extends React.Component{
    render() {
        return (
            <Router history={history}>
                <div className="hr-nav-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul>
                                    <li>
                                        <NavLink to="/dashboard" className="active clearfix"><i className="demo-icon icon-home" aria-hidden="true"></i><span>Dashboard</span></NavLink>
                                    </li>
                                    <li><a className="clearfix"><i className="demo-icon icon-send-money" aria-hidden="true"></i>
                                        <span>Transfer</span></a>
                                        <ul>
                                            <li>
                                                <NavLink to="/transfer/new-transfer">To Wema Account</NavLink>
                                            </li>
                                            <li><a href="#">To Other Banks</a></li>
                                            <li><a href="#">ATM Cardless Withdrawal</a></li>
                                            <li><a href="#">To Email / Phone No</a></li>
                                        </ul>
                                    </li>
                                    <li><a href="#" className="clearfix"><i className="demo-icon icon-bills" aria-hidden="true"></i> <span>Airtime & Bills</span></a>
                                    </li>
                                    <li><a href="#" className="clearfix"><i className="demo-icon icon-target" aria-hidden="true"></i><span> Savings</span></a></li>
                                    <li><a href="transaction-history.html" className="clearfix"><i className="demo-icon icon-loans" aria-hidden="true"></i><span> Loans</span></a>
                                    </li>
                                    <li><a href="#" className="clearfix"><i className="demo-icon icon-movies" aria-hidden="true"></i> <span>Lifestyle</span></a>
                                    </li>
                                    <li><a href="#" className="clearfix"><i className="demo-icon icon-western-union" aria-hidden="true"></i>
                                        <span>Remmitance</span></a></li>
                                    <li><a href="#" className="clearfix"><i className="demo-icon icon-card" aria-hidden="true"></i><span> Cards</span></a>
                                    </li>
                                    <li><a href="#" className="clearfix"><i className="demo-icon icon-setting-icon" aria-hidden="true"></i><span>Settings</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default MenuContainer;
