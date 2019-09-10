import * as React from 'react';
import {HashRouter, NavLink} from 'react-router-dom';
// import {history} from "../../_helpers";
import {Router} from "react-router";
import {Fragment} from "react";


class MenuContainer extends React.Component{
    render() {
        return (
            <Fragment>
                <div className="hr-nav-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul>
                                    <li>
                                        <NavLink to="/dashboard" className="clearfix"><i className="demo-icon icon-home" aria-hidden="true"></i><span>Dashboard</span></NavLink>
                                    </li>
                                    <li><NavLink to="/transfer" className="clearfix"><i className="demo-icon icon-send-money" aria-hidden="true"></i>
                                        <span>Transfer</span></NavLink>
                                        <ul>
                                            <li>
                                                <NavLink to="/transfer">Bank Transfer</NavLink>
                                            </li>
                                            <li><NavLink to="/cardless-withdrawal">ATM Cardless Withdrawal</NavLink></li>
                                            <li><NavLink to="/fx-transfer">Fx Transfer</NavLink></li>
                                            <li><a href="#">To Email / Phone No</a></li>
                                        </ul>
                                    </li>
                                    <li><NavLink to="/default-page" className="clearfix"><i className="demo-icon icon-bills" aria-hidden="true"></i> <span>Profile</span></NavLink>
                                    </li>
                                    <li><NavLink to="/bills/airtime" className="clearfix"><i className="demo-icon icon-bills" aria-hidden="true"></i> <span>Airtime & Bills</span></NavLink>
                                    </li>
                                    <li><NavLink to={"/loans"} className="clearfix"><i className="demo-icon icon-loans" aria-hidden="true"></i><span> Loans</span></NavLink></li>
                                    <li><NavLink to={"/savings"} className="clearfix"><i className="demo-icon icon-target" aria-hidden="true"></i><span> Savings & Investment</span></NavLink></li>
                                   
                                    <li><NavLink to={"/lifestyle"} className="clearfix"><i className="demo-icon icon-movies" aria-hidden="true"></i> <span>Lifestyle</span></NavLink>
                                    </li>
                                    <li><NavLink to="/account" className="clearfix"><i className="fa fa-institution" aria-hidden="true"></i> <span>Accounts</span></NavLink></li>
                                    
                                    
                                    <li><NavLink to="/cards" className="clearfix"><i className="demo-icon icon-card" aria-hidden="true"></i>
                                        <span>Cards</span></NavLink>
                                        <ul>
                                            <li>
                                                <NavLink to="/cards">Request card</NavLink>
                                            </li>
                                            <li><NavLink to="/cards-control">Card Control</NavLink></li>
                                            <li><NavLink to="/setcard-pin">Set Card Pin</NavLink></li>
                                            <li><NavLink to="/hotlist">Hotlist Card</NavLink></li>
                                            <li><NavLink to="/virtual-cards"> Alat Dollar Card </NavLink></li>
                                        </ul>
                                    </li>
                                    <li><NavLink to="/receive-money" className="clearfix"><i className="demo-icon icon-western-union" aria-hidden="true"></i><span> Remittance</span></NavLink></li>
                                    {/* <li><NavLink to="/settings" className="clearfix"><i className="demo-icon icon-setting-icon" aria-hidden="true"></i> <span>Settings</span></NavLink></li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default MenuContainer;
