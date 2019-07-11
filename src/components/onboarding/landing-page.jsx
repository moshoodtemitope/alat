import React from 'react';
import connect from 'react-redux/es/connect/connect';
import OnboardingContainer from "./Container";
import {Link} from 'react-router-dom';
//import mapStateToProps from 'react-redux/es/connect/mapStateToProps';

class OnboardingLandingPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <OnboardingContainer>
                <div className="row">
                    {/* <!-- Header --> */}
                    <div className="col-12">
                        <h3>Hello there!<span></span></h3>
                        <p>We’re so glad you’re ready to come onboard.</p><p>What would you like to sign up for?</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="onboard-form">

                            <input onClick={()=>this.props.history.push("/loan/step-1")} type="button" value="Get a Loan" className="btn-alat btn-block btn-alat-outline" />

                            <input onClick={()=>this.props.history.push("/register")} type="button" value="Get an Account" className="btn-alat btn-block" />

                        </div>

                        <p className="text-center">Already have an account? <Link to={"/"}>Log In</Link></p>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(OnboardingLandingPage); 