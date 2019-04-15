import * as React from 'react';
import {Router} from "react-router";
import history from "./../../_helpers/history";
import logo from "./../../assets/img/logo.svg";
import {Fragment} from "react";

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

export default OnboardingContainer;
