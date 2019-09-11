import * as React from 'react';
import {HashRouter, NavLink} from 'react-router-dom';
import {history} from "../../_helpers";
import {Router} from "react-router";
import {Fragment} from "react";
import './alatPinNotSet.css';
import {userConstants} from "../../redux/constants/onboarding/user.constants";
// import {userConstants} from "../constants/onboarding/user.constants";
import {connect} from 'react-redux';


class MenuContainer extends React.Component{

    constructor(props){
       super(props);
       this.state = {
          toggleModal: 'toggleModal'
       }
    }

    // closeModal = (event) => {
    //     switch(this.state.toggleModal){
    //         case null:
    //            this.setState({toggleModal: "toggleModal"});
    //            break;
    //         case 'toggleModal':
    //            this.setState({toggleModal: null});
    //     }
    // }

    // checkIfAlatIsSet = () => {
    //     switch(this.props.authentication.accounts.isAlatPinSet){
    //         case true:
    //             history.push('/default-page');
    //             console.log('returned true')
    //             break;
    //         case false:
    //             console.log('returned false')
    //             this.closeModal();
    //     }
    //     console.log('Function Ran')
    // }

    render() {
        const {toggleModal} = this.state;
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
                                    <li><NavLink to="/profile" className="clearfix"><i className="demo-icon icon-bills" aria-hidden="true"></i> <span>Profile</span></NavLink>
                                    </li>
                                    {/* <li onClick={this.checkIfAlatIsSet}><i className="demo-icon icon-bills" aria-hidden="true"></i> <span>Profile</span></li> */}
                                   
                                    <li><NavLink to="/bills/airtime" className="clearfix"><i className="demo-icon icon-bills" aria-hidden="true"></i> <span>Airtime & Bills</span></NavLink>
                                    </li>
                                    <li><NavLink to={"/loans"} className="clearfix"><i className="demo-icon icon-loans" aria-hidden="true"></i><span> Loans</span></NavLink></li>
                                    <li><NavLink to={"/savings"} className="clearfix"><i className="demo-icon icon-target" aria-hidden="true"></i><span> Savings & Goal</span></NavLink></li>
                                   
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
                    {/* <div className={toggleModal + " " + "alatNotSetModal"}>
                         <p>Alat Pin Is not Set</p>
                         <button onClick={this.closeModal}>close</button>
                    </div> */}
                </div>
            </Fragment>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//          authentication: state.authentication.user
//     }
// }

// export default connect(mapStateToProps)(MenuContainer);

export default MenuContainer;
