import * as React from 'react';
import logo from "./../../assets/img/logo.svg";
import {Fragment} from "react";
import {connect} from "react-redux";

class OnboardingContainer extends React.Component {
    render() {
        return (
            <Fragment>
                <div>
                    <div className="onboarding">
                        <div className="container middle">
                            <div className="inner">
                                <div className="row">
                                    <div className="col-4">
                                        <img src={logo} alt="ALAT Logo" />
                                    </div>

                                </div>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    return state.onboarding_user_details;
}

export default connect(mapStateToProps)(OnboardingContainer);