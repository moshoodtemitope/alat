
import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';

class LoanOnboardingScoreResult extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <LoanOnboardingContainer>
                <div className="col-sm-12">
							<div className="max-460">
								<div className="loan-header-text text-center">
									<h4 className="text-black">Score Card</h4>
								</div>
								<div className="al-card no-pad">
									<div className="transfer-ctn no-pad unset-pad">
										<div className="col-sm-12 upper-line"></div>
										<div className="result-msg">
											<p>Dear Customer</p>
											<p>Congratulations!!! you have been granted a loan of <b>N600,000.00</b></p>
											<p>Click Accept to proceed</p>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-6">
										<input type="button" value="Accept"
											className="btn-alat  m-b-20 text-center" />
									</div>
									<div className="col-sm-6">
										<input type="button" value="Decline"
											className="btn-alat  m-b-20 text-center btn-alat-outline grey"/>
									</div>
								</div>


							</div>
						</div>
            </LoanOnboardingContainer>
        )
    }
}


function mapStateToProps(state){
    return {
        alert: state.alert,
        //loan_step2: state.loanOnboardingReducerPile.loanOnboardingStep2,
        //loan_val_otp: state.loanOnboardingReducerPile.loanOnboardingValidateOTP,
        //loan_bvn: state.loanOnboardingReducerPile.loanOnboardingBVN,
        //loan_step3: state.loanOnboardingReducerPile.loanOnboardingStep3,
        //bankList: state.transferReducerPile.transfer_bankList,
        loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
        loan_genStat: state.loanOnboardingReducerPile.loanOnboardingGenerateStatement,
        salary_trans: state.loanOnboardingReducerPile.loanOnboardingSalaryTransaction,
        salary_entry: state.loanOnboardingReducerPile.loanSalaryEntryReducer,
        score_card_Q: state.loanOnboardingReducerPile.loanGetScoreCardQuestion,
        score_card_A: state.loanOnboardingReducerPile.loanPostScoreCardAnswer,
    }
}

export default connect(mapStateToProps)(LoanOnboardingScoreResult);



