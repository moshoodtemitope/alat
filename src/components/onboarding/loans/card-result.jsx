
import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import * as util from '../../../shared/utils';
import ScoreResult from '../../../shared/components/loans/_card-result';


class LoanOnboardingScoreResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: JSON.stringify(localStorage.getItem("user")),
			loanDetails: {}
		}
	}

	componentDidMount = () => {
		//this.init();
	}

	// init = () => {
	// 	//console.log(this.props);
	// 	if (this.props.score_card_A.loan_scoreA_data)  //loanOnboardingConstants.LOAN_SCORECARD_ANSWER_SUCCESS
	// 		if (this.props.score_card_A.loan_scoreA_status != loanOnboardingConstants.LOAN_SCORECARD_ANSWER_PENDING) {
	// 			// this.props.history.push("/loan/card-result");
	// 			var data = {
	// 				...this.props.score_card_A.loan_scoreA_data.data.response.Response
	// 			}
	// 			//console.log(data);
	// 			this.setState({ loanDetails: data });
	// 		}
	// }
	goForward=()=>{
        this.props.history.push('/loan/terms');
     }

	doneClick = () => {
		this.props.dispatch(actions.clearLoanOnboardingStore());
		this.props.history.push("/loans/salary/dashboard");
	}

	abortClick=()=>{
        this.props.dispatch(actions.clearLoanOnboardingStore());
        this.props.history.push('/loans/salary/dashboard');
     }

	goBackWard=()=>{
		this.props.history.push('/loan/card-result');
	   }

	// returnScoreCardSuccessStatus = () => {
	// 	if (this.props.score_card_A.loan_scoreA_status == loanOnboardingConstants.LOAN_SCORECARD_ANSWER_SUCCESS)
	// 		return true;
	// 	else return false;
	// }

	render() {
		return (
			<LoanOnboardingContainer UserName={this.state.user.fullName}>
				{/* <div className="col-sm-12">
					<div className="max-460">
						<div className="loan-header-text text-center">
							<h4 className="text-black">Score Card</h4>
						</div>
						<div className="al-card no-pad">
							<div className="transfer-ctn no-pad unset-pad">
								<div className={this.returnScoreCardSuccessStatus() ? "col-sm-12 upper-line-success" : "col-sm-12 upper-line-failure"}></div>
								<div className="result-msg">
									
									<p>Dear Customer</p>
											{this.returnScoreCardSuccessStatus() && <Fragment><p>Congratulations!!! you have been granted a loan of <b>{util.formatAmount(this.state.loanDetails.LoanAmountGranted)}</b></p>
											<p>Click Accept to proceed</p></Fragment>}

											{!this.returnScoreCardSuccessStatus() && <Fragment><p>Apologies!!! loan was not granted</p>
											<p>Click Done to proceed</p></Fragment>}
								</div>
							</div>
						</div>
						{this.returnScoreCardSuccessStatus() && <div className="row">
							<div className="col-sm-6">
								<input type="button" value="Accept"
									className="btn-alat  m-b-20 text-center" />
							</div>
							<div className="col-sm-6">
								<input type="button" value="Decline"
									className="btn-alat  m-b-20 text-center btn-alat-outline grey" />
							</div>
						</div>}
						{!this.returnScoreCardSuccessStatus() && <div className="row">
							<div className="col-sm-12">
								<center>
									<input type="button" value="Done" onClick={this.doneClick}
										className="btn-alat  m-b-20 text-center btn-alat-outline grey" />
								</center>
							</div>
						</div>}


					</div>
				</div> */}
				<ScoreResult
					gotoPreviousPageMethod={this.goBackWard}
					gotoNextPageMethod={this.goForward}
					doneClick={this.doneClick}
					abortClick = {this.abortClick}
				/>);
			</LoanOnboardingContainer>
		)
	}
}


function mapStateToProps(state) {
	return {
		alert: state.alert,

		// loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
		// loan_genStat: state.loanOnboardingReducerPile.loanOnboardingGenerateStatement,
		// salary_trans: state.loanOnboardingReducerPile.loanOnboardingSalaryTransaction,
		// salary_entry: state.loanOnboardingReducerPile.loanSalaryEntryReducer,
		// score_card_Q: state.loanOnboardingReducerPile.loanGetScoreCardQuestion,
		// score_card_A: state.loanOnboardingReducerPile.loanPostScoreCardAnswer,
	}
}

export default connect(mapStateToProps)(LoanOnboardingScoreResult);



