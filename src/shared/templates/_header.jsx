import * as React from 'react';
import { NavLink} from 'react-router-dom';
import {history} from "../../_helpers/history";
import { connect } from 'react-redux';
// import {alertActions} from "../../redux/actions/alert.actions";
import $ from 'jquery';
import {Fragment} from "react";
import {userActions} from "../../redux/actions/onboarding/user.actions";
import whitelogo from "../../assets/img/white-logo.svg";
import profileImage from "../../assets/img/10.jpg";

class HeaderContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            miniNavToggle: false
        };
        const { dispatch } = this.props;

        $('#nav-icon1').click(function(){
            console.error("clicked");
            $(this).toggleClass('open');
            $('.hr-nav-header').fadeToggle();
        });

        $('.user-name-circle').click(function(){
            console.log("Image clicked");
            $('.mini-nav').fadeToggle(300);
        });
        this.toggleMiniNav = this.toggleMiniNav.bind(this);
    }


    logout(){
        const { dispatch } = this.props;
        dispatch(userActions.logout());
        localStorage.removeItem("user");
        history.push('/');
    }

    toggleMiniNav(){
        this.setState({ miniNavToggle: !this.state.miniNavToggle })
    }

    renderMiniNav(){
        if(this.state.miniNavToggle){
            return(
                <div className="mini-nav" style={{display: 'block'}}>
                    <ul>
                        <li><a href="#">Profile</a></li>
                        <li><NavLink to="/settings">Settings</NavLink></li>
                        <li>
                            {/*<NavLink to="/logout">Logout</NavLink>*/}
                            <a onClick={this.logout.bind(this)}>Logout</a>
                        </li>
                    </ul>
                </div>
            )
        }

        else{
            return(
                <div className="mini-nav">
                    <ul>
                        <li><a href="#">Profile</a></li>
                        <li><NavLink to="/account">Accounts</NavLink></li>
                        <li><NavLink to="/settings">Settings</NavLink></li>
                        <li>
                            <NavLink to="/logout">Logout</NavLink>
                            {/*<a onClick={this.logout.bind(this)}>Logout</a>*/}
                        </li>
                    </ul>
                </div>
            )
        }

    }

    componentDidMount() {

        // console.log(this.props);
        // this.props.dispatch(userActions.getAll());
    }

    render() {
        const user = JSON.parse(localStorage.getItem("user"));

        return (
            <Fragment>
                <div className="db2-fixed-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-4 col-sm-4">
                                <div id="nav-icon1" className="">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                <a href="/">
                                    <img src={whitelogo} />
                                </a>
                            </div>
                            <div className="col-xs-8 col-sm-8">
                                <div className="user-name-circle clearfix" onClick={ this.toggleMiniNav }>
                                    <div className="circle-image">
                                        <img src="../../assets/img/10.jpg" />
                                    </div>
                                    <p className="name">{user.fullName}</p>
                                </div>
                                { this.renderMiniNav() }
                                <span className="notification-top"><i className="demo-icon icon-alert-active"></i></span>
                            </div>


                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state) {
    console.log(state);
    const { user } = state;
    return {
        user
    };
}

export default connect(mapStateToProps)(HeaderContainer);