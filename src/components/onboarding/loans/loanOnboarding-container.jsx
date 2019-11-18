import React, { Fragment } from 'react';
import { connect } from "react-redux";
import whiteLogo from "../../../assets/img/white-logo.svg";

class LoanOnboardingContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        //console.log('user name is', (user===null));
      return( <Fragment>
            <div className="db2-fixed-header">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-4 col-sm-4">
                            {user!==null && 
                                <div id="nav-icon1" className="">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            }
                            <a href="/">
                                <img src={whiteLogo} /> </a>
                        </div>
                        {user!==null &&
                            <div className="col-xs-8 col-sm-8">
                                <div className="user-name-circle clearfix">
                                    <div className="circle-image">
                                        <img src="img/10.jpg" />
                                    </div>
                                    {this.props.UserName && <p className="name">Hi, {this.props.UserName}</p>}
                                </div>

                                <span className="notification-top"><i className="demo-icon icon-alert-active"></i></span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="dashboard-wrapper not-white">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            {/* <div className="row"> */}
                                {this.props.children}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>);
    }
}

function mapStateToProps(state) {
    return state
}
export default connect(mapStateToProps)(LoanOnboardingContainer);