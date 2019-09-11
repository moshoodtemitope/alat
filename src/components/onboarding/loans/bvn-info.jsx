import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';

class LoanOnboardingBVNInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          FirstName: "",
          LastName: "",
          PhoneNumber: "",
          Gender: "",
          Dob: "",
          BVN: ""
        }
    }
    componentDidMount(){
        this.init();
    }

    init=()=>{
         if(this.props.loan_val_otp)
        if(this.props.loan_val_otp.loan_valOtp_status == loanOnboardingConstants.LOAN_VALIDATEOTP_SUCCESS){
            var data ={
                ...this.props.loan_val_otp.loan_valOtp_data.data
            };

            this.setState({
                 FirstName : data.response.firstName,
                 LastName : data.response.lastName,
                 Gender : data.response.gender,
                 Dob: data.response.dob,
                 BVN: data.response.bvn,
                 PhoneNumber : data.response.phoneNumber
            },()=>{
                this.props.dispatch(actions.saveUserDetails({ FirstName : data.response.firstName }))
            });
        }else this.props.history.push("/loan/validateotp");
        else this.props.history.push("/loan/validateotp");
    }

    CreateProfile =()=>{
        var data = {
            ...this.props.loan_bvn.loan_bvn_data.data
        };

        this.props.dispatch(actions.LoanOnboardingStep3({
            firstname: this.state.firstName,
            email: data.request.email,
            phoneNumber: data.request.phoneNo,
            fullName: `${this.state.FirstName} ${this.state.LastName}`,
            bvn: this.state.BVN,
            password: data.request.password,
            imei: '354553073954109',
            "channelId": 2,
            dateOfBirth: data.request.dateOfBirth,
            isOnboarding: true,
            loanAmount: data.request.loanAmount,
            tenure: data.request.tenure,
            deviceName: 'string-5',
            deviceOs: 'string-6',
            gcmRegId: 'string-8',
            deviceCode: 'string-10'
        }));
    }

    formartDate=(dateString)=>{
        let dateObj = new Date(dateString);
        let   day = dateObj.getDate();
        let   month = dateObj.getMonth()+1;
        let    year = dateObj.getFullYear();
        let    fullDob = day+'/'+month+'/'+year;
        return fullDob;
    }
    
    gotoSalaryDetails=()=>{
      if(this.props.loan_createprofile)
      if(this.props.loan_createprofile.loan_step3_status == loanOnboardingConstants.LOAN_STEP3_SUCCESS){
        //   this.props.history.push("/loan/salary-detail");
       // console.log();
        localStorage.setItem("user", JSON.stringify(this.props.loan_createprofile.loan_step3_data.data.response));
        this.props.history.push("/loan/work-detail");
      }
    }

    render() {
        return (<LoanOnboardingContainer UserName={this.state.FirstName}>
            {this.gotoSalaryDetails()}
            <div className="col-sm-12">
                <div className="max-500">
                    <div className="loan-header-text text-center">
                        <h4 className="text-black">Verify your BVN Details</h4>
                        <p>Ensure the BVN details belongs to you.</p>
                    </div>
                    <div className="al-card">
                    {this.props.alert && this.props.alert.message &&
                            <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                        }
                        <div className="details-container">
                            <div className="row mb-4">
                                <div className="col-6">
                                    <span className="label">First Name</span><br />
                                    <span>{this.state.FirstName}</span>
                                </div>
                                <div className="col-6">
                                    <span className="label">Last Name</span><br />
                                    <span>{this.state.LastName}</span>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <span className="label">Phone Number</span><br />
                                    <span>{this.state.PhoneNumber}</span>
                                </div>
                                <div className="col-6">
                                    <span className="label">Date of Birth</span><br />
                                    <span>{this.formartDate(this.state.Dob)}</span>
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-6">
                                    <span className="label">Gender</span><br />
                                    <span>{this.state.Gender}</span>
                                </div>
                                <div className="col-6">
                                    <span className="label">BVN</span><br />
                                    <span>{this.state.BVN}</span>
                                </div>
                            </div>
                        </div>
                        {/* style={{cursor: "pointer", color: "white"}} */}
                        <button 
                        disabled= {this.props.loan_createprofile.loan_step3_status == loanOnboardingConstants.LOAN_STEP3_PENDING}
                        className="btn-alat btn-block"
                        onClick={this.CreateProfile}>
                        {this.props.loan_createprofile.loan_step3_status == loanOnboardingConstants.LOAN_STEP3_PENDING ? "Processing..." : "Confirm Details"}
                        </button>
                    </div>

                </div>
            </div>
        </LoanOnboardingContainer>);
    }
}

function mapStateToProps(state){
    return {
        alert: state.alert,
        loan_val_otp: state.loanOnboardingReducerPile.loanOnboardingValidateOTP,
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        loan_createprofile: state.loanOnboardingReducerPile.loanOnboardingStep3
    };
}

export default connect(mapStateToProps)(LoanOnboardingBVNInfo);