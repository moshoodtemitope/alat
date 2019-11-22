import * as React from "react";
// import {getAnnouncement} from "./actions";
import {Router} from "react-router";
import {HashRouter, NavLink} from 'react-router-dom';
// import {history} from "../_helpers";
import { connect } from "react-redux";
// import {userConstants} from "../_constants";
// import {routes} from "../shared/urls";
import {Fragment} from "react";
import InnerContainer from "../../shared/templates/inner-container";
import {routes} from "../../services/urls";
import homebanner from "../../assets/img/homebanner.svg";
import emailCenter from '../../assets/img/email-contact.svg';
import phoneContact from '../../assets/img/phone-contact.svg';
import "./home.scss";


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
    }

    

    componentDidMount() {

    }

    returnGreeting(){
        let today = new Date()
        let curHr = today.getHours()

        if (curHr < 12) {
            return 'Morning';
        } else if (curHr < 18) {
            return 'Afternoon';
        } else {
            return 'Evening';
        }
    }

    renderLandingScreen(){
        let bannerDesignUrl = `${homebanner}`,
            bannerStyle= {
                backgroundImage: `url('${bannerDesignUrl}')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center 5px'
            };
        return(
            <div className="landing-wrap">
                <div className="container">
                    <div className="quicklinks-wrap">
                        {/* <div className="container"> */}
                            <div className="welcome-textwrap">
                                <h3>Good {this.returnGreeting()}, <span>{this.state.user.fullName}</span></h3>
                                <h5>What would you like to do today?</h5>
                            </div>
                            <div className="menuitem-links">
                                <ul>
                                    <li>
                                        <NavLink to="/dashboard" className="clearfix"><i className="demo-icon icon-home" aria-hidden="true"></i><span>Dashboard</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/transfer" className="clearfix"><i className="demo-icon icon-send-money" aria-hidden="true"></i>Send Money</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/account" className="clearfix"><i className="demo-icon icon-loans" aria-hidden="true"></i><span>My Accounts</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/bills/airtime" className="clearfix"><i className="demo-icon icon-bills" aria-hidden="true"></i> <span>Buy Airtime &amp; Data</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/bills/paybills" className="clearfix"><i className="demo-icon icon-bills" aria-hidden="true"></i> <span>Pay Bills</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/lifestyle/movie"} className="clearfix"><i className="demo-icon icon-movies" aria-hidden="true"></i>Lifestyle</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/savings"} className="clearfix"><i className="demo-icon icon-target" aria-hidden="true"></i>Savings &amp; Investment</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={"/loans"} className="clearfix"><i className="demo-icon icon-loans" aria-hidden="true"></i><span>Get a Loan</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={this.state.user.isWemaMobileUser===false?'/cards':'/cards-control'} className="clearfix"><i className="demo-icon icon-card" aria-hidden="true"></i>Cards</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/insurance" className="clearfix"><i className="demo-icon icon-setting-icon" aria-hidden="true"></i> <span>Buy Insurance</span></NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/receive-money" className="clearfix"><i className="demo-icon icon-western-union" aria-hidden="true"></i><span> Western Union</span></NavLink>
                                    </li>
                                </ul>
                            </div>
                            <div className="support-text-wrap">
                                <h4>Talk to us</h4>
                                <div className="support-info">
                                    We are happy to assist
                                </div>
                                <div className="talk-tous-wrap">
                                    <div>
                                        <img src={emailCenter} />
                                        <span>help@alat.ng</span>
                                    </div>
                                    <div>
                                        <img src={phoneContact} />
                                        <span>070022552528</span>
                                    </div>
                                </div>
                            </div>
                        {/* </div> */}
                    </div>
                    <div className="banner-wrap">
                    {/* <div className="banner-wrap" style={bannerStyle}> */}
                            <img src={homebanner} alt=""/>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return (
            <Fragment>
                <InnerContainer>
                    {this.renderLandingScreen()}
                </InnerContainer>
                
            </Fragment>

        );
    }
}


function mapStateToProps(state) {
    //console.log(state);
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
    };
}

export default connect(mapStateToProps)(LandingPage);