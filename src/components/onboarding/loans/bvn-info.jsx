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
            });
        }else this.props.history.push("/loan/validateotp");
        else this.props.history.push("/loan/validateotp");
    }

    render() {
        return (<LoanOnboardingContainer>
            <div className="col-sm-12">
                <div className="max-500">
                    <div className="loan-header-text text-center">
                        <h4 className="text-black">Verify your BVN Details</h4>
                        <p>Ensure the BVN details belongs to you.</p>
                    </div>
                    <div className="al-card">
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
                                    <span>{this.state.Dob}</span>
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
                        <a href="#" className="btn-alat btn-block">Confirm Details</a>
                    </div>

                </div>
            </div>
        </LoanOnboardingContainer>);
    }
}

function mapStateToProps(state){
    return {
        loan_val_otp: state.loanOnboardingReducerPile.loanOnboardingValidateOTP,
    };
}

export default connect(mapStateToProps)(LoanOnboardingBVNInfo);