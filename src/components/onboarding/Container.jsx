import * as React from 'react';
import logo from "./../../assets/img/logo.svg";
import {Fragment} from "react";
import {connect} from "react-redux";

class OnboardingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let step = this.props.registration_step;
        console.log(this.props.location);

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
                                    <div className="col-sm-8 col-8 text-right pull-right">
                                        <i className={"fa fa-circle bullet " + (step > 0 ? 'active' : 'inactive')}></i>&nbsp;
                                        <i className={"fa fa-circle bullet " + (step > 1 ? 'active' : 'inactive')}></i>&nbsp;
                                        <i className={"fa fa-circle bullet " + (step > 2 ? 'active' : 'inactive')}></i>&nbsp;
                                        <i className={"fa fa-circle bullet " + (step > 3 ? 'active' : 'inactive')}></i>&nbsp;
                                        <i className={"fa fa-circle bullet " + (step > 4 ? 'active' : 'inactive')}></i>&nbsp;
                                        <i className={"fa fa-circle bullet " + (step > 5 ? 'active' : 'inactive')}></i>
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
    console.log(state);
    return state.onboarding_user_details;
}

export default connect(mapStateToProps)(OnboardingContainer);