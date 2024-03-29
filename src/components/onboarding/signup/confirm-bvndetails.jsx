import * as React from 'react';
import { NavLink} from "react-router-dom";
import OnboardingContainer from "../Container";
import {connect} from "react-redux";
import {ApiService} from "../../../services/apiService";
import {routes} from "../../../services/urls";
import {
    OTP_VERIFICATION_SUCCESS,
    USER_REGISTER_FETCH,
    USER_REGISTER_SAVE,
    SAVE_BVN_INFO
} from "../../../redux/constants/onboarding/user.constants";
import {userActions} from "../../../redux/actions/onboarding/user.actions";
import {history} from "../../../_helpers/history";

import {alertActions} from "../../../redux/actions/alert.actions";
import {modelStateErrorHandler} from "../../../shared/utils";
import { type } from 'os';

var myGlobal = {};
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
        
        this.confirmDetails = this.confirmDetails.bind(this);
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
            // console.log('user data is ---', userData);
        }
    }

    getBvnDetails(){
        const { dispatch } = this.props;
        let bvnDetails = this.props.customer_bvn_info;
        let bvndatainfo = this.props.bvn_details;
        
        if(bvnDetails){
            
            let bvnStatus = bvnDetails.otp_confirmation_status;
            let phoneEmail = "";
            if(bvnStatus === OTP_VERIFICATION_SUCCESS){
                let resp = bvnDetails.otp_data_returned.otpData.data;
                myGlobal = resp;
                    this.setState({bvnPhoneNo: resp.bvnPhoneNo,customerBvnData:resp});
                
            }
            else{
                history.push('/register');
            }
        }
        else{
           // console.log('no bvn details');
        }
        
    }

    confirmDetails(){
        // console.log('fiancle email status', this.state.customerBvnData);
        history.push('/register/create-account');
    }

    

    componentDidMount() {
        this.getRegistrationDetails();
        this.getBvnDetails();
    }

    

   

    render(){
        let state = this.state;
        
            const bvnInfo = state.customerBvnData;
            myGlobal = state.customerBvnData;
            
            var customerData = Object.assign({}, myGlobal);
             
           
            
        let dateObj = new Date(customerData.dob),
            day = dateObj.getDate(),
            month = dateObj.getMonth()+1,
            year = dateObj.getFullYear(),
            fullDob = day+'/'+month+'/'+year;
            
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
                                    <span>{customerData.firstName}</span>
                                </div>
                                <div className="col-6">
                                    <span className="label">Last Name</span><br/>
                                    <span>{customerData.lastName}</span>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <span className="label">Phone Number</span><br/>
                                    <span>{customerData.phoneNumber}</span>
                                </div>
                                <div className="col-6">
                                    <span className="label">Date of Birth</span><br/>
                                    <span>{fullDob}</span>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <span className="label">Gender</span><br/>
                                    <span>{customerData.gender}</span>
                                </div>
                                <div className="col-6">
                                    <span className="label">BVN</span><br/>
                                    <span>{customerData.bvn}</span>
                                </div>
                            </div>
                        </div>
                        <a href="#" className="btn-alat btn-block" onClick={this.confirmDetails} >Confirm Details</a>
                    </div>
                </div>
            </OnboardingContainer>
        );
    }
}


function mapStateToProps(state){

    return {
        user_details: state.onboarding_user_details,
        bvn_details: state.onboarding_bvn_details,
        customer_bvn_info: state.onboarding_dataFrom_bvn,
    }
}

export default connect(mapStateToProps)(ConfirmBvnDetails);