import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import * as util from '../../utils';

class ScoreResult extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: JSON.stringify(localStorage.getItem("user")),
			loanDetails: {}
		}
	}

	componentDidMount = () => {
		this.init();
	}

	init = () => {
		//I made the call on the previous page, checking here to see the call is not busy
		if (this.props.score_card_A.loan_scoreA_data)  //loanOnboardingConstants.LOAN_SCORECARD_ANSWER_SUCCESS
			if (this.props.score_card_A.loan_scoreA_status != loanConstants.LOAN_SCORECARD_ANSWER_PENDING) {
				//this.props.gotoPreviousPageMethod();// this.props.history.push("/loan/card-result");
				// this.props.history.push(this.props.backwardUrl);

				var data = {
					...this.props.score_card_A.loan_scoreA_data.data.response.Response
				}
				//console.log(data);
				this.setState({ loanDetails: data });
			}
	}

	doneClick = () => {
		this.props.dispatch(actions.clearLoanOnboardingStore());
		this.props.doneClick();
	}
	
	declineClikc =()=>{
		this.props.dispatch(LoanActions.loanReject(this.state.user.token)); //What should be done after firing reject loan
	}

	declineAction =()=>{
		if(this.props.loan_reject){
			if(this.props.loan_reject.loan_reject_status == loanConstants.LOAN_REJECT_SUCCESS){
				this.props.dispatch(LoanActions.clearLoanOnboardingStore());
				//this.props.gotoPreviousPageMethod();
				this.props.abortClick();
			}
		}
	}

	acceptClick = () =>{
		this.props.gotoNextPageMethod();
	}

	returnScoreCardSuccessStatus = () => {
		if (this.props.score_card_A.loan_scoreA_status == loanConstants.LOAN_SCORECARD_ANSWER_SUCCESS)
			return true;
		else return false;
	}

	render() {
		
		return (

			<div className="col-sm-12">
				<div className="max-460">
					<div className="loan-header-text text-center">
						<h4 className="text-black">Score Card Result</h4>
					</div>
					<div className="al-card no-pad">
						<div className="transfer-ctn no-pad unset-pad">
							<div className={this.returnScoreCardSuccessStatus() ? "col-sm-12 upper-line-success" : "col-sm-12 upper-line-failure"}></div>
							<div className="result-msg">

								<p>Dear {this.state.user.fullName}</p>
								{this.returnScoreCardSuccessStatus() && <Fragment><p>Congratulations!!! your loan have been granted.View Details Below </p>
									<p><b>Loan Amount:{util.mapCurrency("NGN")} : {this.state.loanDetails.LoanAmountGranted}</b>
									<br/>
										<b>Loan Tenure: {this.state.loanDetails.LoanTenure} Months</b>
										<br/>
										<b>Monthly Repayment:  {this.state.loanDetails.MonthlyRepaymentAmount}</b>
									</p>
									<p>Click Continue to proceed</p></Fragment>}

								{!this.returnScoreCardSuccessStatus() && <Fragment><p>Apologies!!! loan was not granted</p>
									<p>Click Done to proceed</p></Fragment>}
							</div>
						</div>
					</div>
					{this.returnScoreCardSuccessStatus() && <div className="row">
						<div className="col-sm-6">
							<input type="button" value="Continue" onClick={this.acceptClick}
								className="btn-alat  m-b-20 text-center" />
						</div>
						<div className="col-sm-6">
							<input type="button" value="Decline" onClick={this.declineClikc}
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
			</div>

		)
	}
}


function mapStateToProps(state) {
	return {
		alert: state.alert,
		loan_reqStat: state.loanOnboardingReducerPile.loanOnboardingRequestStatement,
		loan_genStat: state.loanOnboardingReducerPile.loanOnboardingGenerateStatement,
		
		score_card_Q: state.loanOnboardingReducerPile.loanGetScoreCardQuestion,
		score_card_A: state.loanOnboardingReducerPile.loanPostScoreCardAnswer,

		loan_reject: state.loanOnboardingReducerPile.loanRejectReducer
	}
}

export default connect(mapStateToProps)(ScoreResult);



