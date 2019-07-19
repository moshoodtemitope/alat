import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import OtpValidation from '../../../shared/components/otpvalidation';

class LOanONboardingTicket extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <LoanOnboardingContainer>
        <div className="al-card no-pad">
        <div className="transfer-ctn">
            {this.props.alert && this.props.alert.message &&
                <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
            }
            <form>
                <div class="input-ctn">
                    <label>Ticket Number</label>
                    <input type="tel" />
                </div>
                <div class="input-ctn">
                    <label>Password</label>
                    <input type="password" />
                </div>
                

                <div className="row">
                    <div className="col-sm-12">
                        <center>
                            <input onClick={this.onSubmit} type="button" value="Validate" className="btn-alat m-t-10 m-b-20 text-center" />
                        </center>
                    </div>
                </div>
            </form>
        </div>
    </div>
    </LoanOnboardingContainer>
    )
    };
}
function mapStateToProps(state) {
    return {
        alert: state.alert,
        //loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2,
        //loan_val_otp: state.loanOnboardingReducerPile.loanOnboardingValidateOTP,
        loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        loan_step3: state.loanOnboardingReducerPile.loanOnboardingStep3,
        //bankList: state.transferReducerPile.transfer_bankList,
        loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingGenerateStatement
    };
}
export default connect(mapStateToProps)(LOanONboardingTicket);