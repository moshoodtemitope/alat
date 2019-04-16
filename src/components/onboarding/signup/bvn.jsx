import * as React from 'react';
import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";
import {USER_REGISTER_FETCH, USER_REGISTER_SAVE} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {history} from "../../../_helpers/history";

class Bvn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getRegistrationDetails(){
        const { dispatch } = this.props;
        let props = this.props;
        let userData;
        let registrationStatus = props.registration_status;
        if(registrationStatus === USER_REGISTER_SAVE){
            userData =  props.registration_data.user;
            this.setState({userData: userData});
            this.setState({phone: userData.phone});
            console.log(userData)
        }
    }

    componentDidMount() {
        this.getRegistrationDetails();
    }

    render(){
        let userState = this.props.onboarding_user_details;
        let phone = '';
        let state = this.state;

        return (
            <OnboardingContainer>
                <div className="row">
                    <div className="col-12">
                        <h3>Link your BVN<span></span></h3>
                        <p>We’re so glad you’re ready to come onboard. Let’s start by getting to know you better.</p>
                        <p>Your phone number is {state.phone}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form className="onboard-form">
                            <div className="input-ctn">
                                <label>Enter your BVN</label>
                                <input type="number"/>
                            </div>

                            <div className="input-ctn">
                                <label>Your Date of Birth</label>
                                <input type='text' className="datepicker-here" data-position='top left'
                                       data-language='en'/>
                            </div>

                            <input type="submit" value="Continue" className="btn-alat btn-block"/>
                        </form>
                        <p className="text-center"><NavLink to="/">Skip BVN</NavLink></p>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}


function mapStateToProps(state){
    return state.onboarding_user_details;
}

export default connect(mapStateToProps)(Bvn);