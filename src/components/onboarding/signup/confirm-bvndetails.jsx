import * as React from 'react';
import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {
    BVN_VERIFICATION_SUCCESS,
    USER_REGISTER_FETCH,
    USER_REGISTER_SAVE
} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {history} from "../../../_helpers/history";

import {alertActions} from "../../../redux/actions/alert.actions";
import {modelStateErrorHandler} from "../../../shared/utils";

class ConfirmBvnDetails extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            error: '',
            otpValue: '',
            formError: '',
            // resendingOtp: false,
            // resendStatus: ""
        };

        // this.handleInputBlur = this.handleInputBlur.bind(this);
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
            console.log('user data is ---', userData);
        }
    }

    getBvnDetails(){
        const { dispatch } = this.props;
        let bvnDetails = this.props.customer_bvn_info;
        console.log('bvn details', bvnDetails);
        if(bvnDetails){
            
            let bvnStatus = bvnDetails.bvn_verification_status;
            let phoneEmail = "";
            if(bvnStatus === BVN_VERIFICATION_SUCCESS){
                let resp = bvnDetails.bvn_verification_data.response;
                this.setState({bvnPhoneNo: resp.bvnPhoneNo, phoneNo: resp.phoneNo});
                this.setState({otpSent: true});
            }
            else{
                console.log('here only');
                // history.push('/register');
            }
        }
        else{
            // history.push('/register');
            console.log('no bvn details');
        }
        
    }

    

    componentDidMount() {
        this.getRegistrationDetails();
        this.getBvnDetails();
    }

    

   

    render(){
        // let userState = this.props.onboarding_user_details;
        // // let phone = '';
        // let state = this.state;
        
        // const {otpValue, error,submitted, emptyOtp, submitDisabled} = this.state;
        return (
            <OnboardingContainer>
                <div className="row">
                    <h3>Verify BVN details<span></span></h3>
                    <p>Kindly verify if the details below are correct.</p>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="details-container">
                            <div className="row mb-4">
                                <div className="col-6">
                                    <span className="label">First Name</span><br/>
                                    <span>John</span>
                                </div>
                                <div className="col-6">
                                    <span className="label">Last Name</span><br/>
                                    <span>Doe</span>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <span className="label">Phone Number</span><br/>
                                    <span>08020675432</span>
                                </div>
                                <div className="col-6">
                                    <span className="label">Date of Birth</span><br/>
                                    <span>19/12/1989</span>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <span className="label">Gender</span><br/>
                                    <span>Male</span>
                                </div>
                                <div className="col-6">
                                    <span className="label">BVN</span><br/>
                                    <span>2234789090</span>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="btn-alat btn-block">Confirm Details</a>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}


function mapStateToProps(state){
    // return {
    //     user_details: state.onboarding_user_details,
    //     bvn_details: state.onboarding_bvn_details,
    //     alert: state.alert
    // }

    return {
        customer_bvn_info: state.onboarding_dataFrom_bvn,
    }
}

export default connect(mapStateToProps)(ConfirmBvnDetails);