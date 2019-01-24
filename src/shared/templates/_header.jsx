import * as React from 'react';
import { HashRouter } from 'react-router-dom';
import {history} from "../../_helpers";
import {Router} from "react-router";
import { connect } from 'react-redux';


class HeaderContainer extends React.Component{
    logout(){
        localStorage.removeItem("user");
        history.push('/');
    }

    componentDidMount() {
        console.log(this.props);
        // this.props.dispatch(userActions.getAll());
    }

    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        return (
            <Router history={history}>
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
                                    <img src="/public/assets/img/white-logo.svg" />
                                </a>
                            </div>

                            <div className="col-xs-8 col-sm-8">
                                <div className="user-name-circle clearfix">
                                    <div className="circle-image">
                                        <img src="/public/assets/img/10.jpg" />
                                    </div>
                                    <p className="name">{user.fullName} | <a click="logout()">Logout</a></p>
                                </div>

                                <span className="notification-top"><i className="demo-icon icon-alert-active"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}


//
// function mapStateToProps(state) {
//     const { users, authentication } = state;
//     const { user } = authentication;
//     return {
//         user,
//         users
//     };
// }
//
// const connectedHomePage = connect(mapStateToProps)(HeaderContainer);
// export { connectedHomePage as HeaderContainer };


export default HeaderContainer;
