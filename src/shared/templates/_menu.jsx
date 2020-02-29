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
          user: JSON.parse(localStorage.getItem("user")),
          toggleModal: 'toggleModal',
          showMenu: false
       }

       this.closeMobileMenu = this.closeMobileMenu.bind(this);
       this.openMobileMenu    = this.openMobileMenu.bind(this); 
       //console.log('user data is', this.state.user);
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

    closeMobileMenu(){
        this.setState({showMenu:false})
    }

    openMobileMenu(){
        let {showMenu} = this.state;
        if(showMenu ===true){
            this.setState({showMenu:false})
        }
        
        if(showMenu ===false){
            this.setState({showMenu:true})
        }
    }
    

    render() {
        let {toggleModal, showMenu} = this.state;
        return (
            <Fragment>
                {/* <div id="nav-icon1" className="" onClick={ this.openMobileMenu }>
                    <span></span>
                    <span></span>
                    <span></span>
                </div> */}
                <div className={showMenu?"hr-nav-header open-fullmenu":"hr-nav-header"}>
                    <div className="mobile-menu-bottomlayer" onClick={this.closeMobileMenu}></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 remove-padding">
                                <ul>
                                    <li>
                                        <NavLink to="/dashboard" className="clearfix"><i className="demo-icon icon-home" aria-hidden="true"></i><span>Dashboard</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/account" className="clearfix"><i className="demo-icon icon-loans" aria-hidden="true"></i><span>My accounts</span></NavLink>
                                    </li>
                                    <li><NavLink to="/transfer" className="clearfix"><i className="demo-icon icon-send-money" aria-hidden="true"></i>
                                        <span>Transfers</span></NavLink>
                                        <ul>
                                            <li>
                                                <NavLink to="/transfer">Bank Transfer</NavLink>
                                            </li>
                                            <li><NavLink to="/cardless-withdrawal">ATM Cardless Withdrawal</NavLink></li>
                                            <li><NavLink to="/fx-transfer">Fx Transfer</NavLink></li>
                                            <li><NavLink to="/fund">Fund My Account</NavLink></li>

                                            {/* <li><a href="#">To Email / Phone No</a></li> */}
                                        </ul>
                                    </li>
                                   
                                   
                                    <li><NavLink to="/bills/airtime" className="clearfix"><i className="demo-icon icon-bills" aria-hidden="true"></i> <span>Airtime & Bills</span></NavLink>
                                    </li>
                                    <li><NavLink to={"/loans"} className="clearfix"><i className="demo-icon icon-loans" aria-hidden="true"></i><span> Loans</span></NavLink></li>
                                    <li><NavLink to={"/savings"} className="clearfix"><i className="demo-icon icon-target" aria-hidden="true"></i><span> Savings & Investment</span></NavLink></li>
                                    {/* <li><NavLink to={"/loans"} className="clearfix"><i className="demo-icon icon-loans" aria-hidden="true"></i><span> Loans</span></NavLink></li> */}
                                   
                                    <li><NavLink to={"/lifestyle/movie"} className="clearfix"><i className="demo-icon icon-movies" aria-hidden="true"></i> <span>Lifestyle</span></NavLink>
                                    </li>
                                    {/* <li><NavLink to="/account" className="clearfix"><i className="fa fa-institution" aria-hidden="true"></i> <span>Accounts</span></NavLink></li> */}
                                    
                                    
                                    <li>
                                        <NavLink to={this.state.user.isWemaMobileUser===false?'/cards':'/cards-control'} className="clearfix"><i className="demo-icon icon-card" aria-hidden="true"></i>
                                        <span>Cards</span></NavLink>
                                        <ul>
                                            {this.state.user.isWemaMobileUser===false &&
                                                <li>
                                                    <NavLink to="/cards">Request card</NavLink>
                                                </li>
                                            }
                                            <li><NavLink to="/cards-control">Card Control</NavLink></li>
                                            {this.state.user.isWemaMobileUser===false &&
                                                <li><NavLink to="/setcard-pin">Set Card Pin</NavLink></li>
                                            }
                                            {this.state.user.isWemaMobileUser===false &&
                                                <li><NavLink to="/hotlist">Hotlist Card</NavLink></li>
                                            }
                                            <li><NavLink to="/virtual-cards"> Virtual Dollar Card </NavLink></li>
                                        </ul>
                                    </li>
                                    {/* <li><NavLink to="/settings" className="clearfix"><i className="demo-icon icon-setting-icon" aria-hidden="true"></i> <span>Settings</span></NavLink></li> */}
                                    <li><NavLink to="/insurance" className="clearfix"><i className="demo-icon icon-setting-icon" aria-hidden="true"></i> <span>Insurance</span></NavLink></li>
                                    <li><NavLink to="/receive-money" className="clearfix"><i className="demo-icon icon-western-union" aria-hidden="true"></i><span> Western Union</span></NavLink></li>
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
