
import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import * as util from '../../utils';
import { CollectionScreenOption } from '../../constants';
import { LoanApplicationProgress } from '../../../shared/constants';

class LoanTermsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        }
    }

    componentDidMount = () => {
        this.init();
    }

    init = () => {
        if (this.props.standing_order) {
            if (this.props.standing_order.loan_standOrder_status == loanConstants.LOAN_STAND_ORDER_SUCCESS) {
            } else {
                // this.props.NavigateToPreviousPage();
            }
        }
        // else
        // if (this.props.loan_status){
        //     if (this.props.loan_status.loan_app_data.data === LoanApplicationProgress.Inprogress_Collection) {
        //     } else {
        //         this.props.NavigateToPreviousPage();
        //     }
        // }
        else {
            // this.props.NavigateToPreviousPage(); 
        }

        this.LoadTerms();
    }

    LoadTerms = () => {
        this.props.dispatch(actions.getTerms(this.state.user.token));
    }

    onAccept = () => {
        this.props.dispatch(actions.loanStandingOrder(this.state.user.token));
    }

    onNextPage = () => {
        if (this.props.standing_order)
            if (this.props.standing_order.loan_standOrder_status == loanConstants.LOAN_STAND_ORDER_SUCCESS) {
                var data = {
                    ...this.props.standing_order.loan_standOrder_data.response.Response
                }
                if (data.GetCollectionScreenOption == CollectionScreenOption.WemaAccountSetup) {
                    this.props.NavigateToWema();
                }
                if (data.GetCollectionScreenOption == CollectionScreenOption.RemitaOtpSetup) {
                    this.props.NavigateToRemitaOtpSetup();
                }
                if (data.GetCollectionScreenOption == CollectionScreenOption.RemitaBankSetup) {
                    this.props.NavigateToRemitaBankSetup();
                }
            }
    }

    onDecline = () => {
        this.props.dispatch(actions.loanReject(this.state.user.token));
    }

    declineAction = () => {
        if (this.props.loan_reject) {
            if (this.props.loan_reject.loan_reject_status == loanConstants.LOAN_REJECT_SUCCESS) {
                this.props.dispatch(actions.clearLoanOnboardingStore());
                this.props.NavigateToPreviousPage();
            }
        }
    }

    render() {
        { this.declineAction() }
        {this.onNextPage()}
        return (
            <Fragment>
               
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-460">
                            <div className="loan-header-text text-center">
                                {/* <h4 className="text-black">Terms and Conditions</h4> */}

                            </div>
                            <div className="al-card no-pad">
                                <div className="transfer-ctn">
                                    {/* <span>
                                        Loan terms can also be the characteristics of your loan, which are described
                                        in your
                                        loan agreement. When you borrow money, you and your lender agree to certain
                                        things
                                        which are the "terms" of your loan. They\'ll provide a sum of money, you\'ll
                                        repay
                                        according to an agreed upon schedule, and if something goes wrong each of
                                        you has
                                        rights and responsibilities that are listed in the loan
											agreement.<br /><br />Some common
                                    terms that are worth paying attention to are listed below.
											<br /><br /><b>Interest Rate:</b> How much interest is charged on your loan
                                    balance
                                    every period. The higher the rate, the more expensive your loan. It\'s also
                                    important
                                    to find out if your loan has a fixed interest rate or a variable rate that
                                    can change
                                    at some point in the future. Rates are often quoted in terms of an annual
                                    percentage
                                    rate (APR), which might account for additional costs besides interest costs.
											<br /><br /><b>Monthly Payment:</b> Your monthly payment is often calculated
                                    with the
                                    length of your loan and the
										</span> */}
                                    {this.props.loan_terms && this.props.loan_terms.terms_status == loanConstants.LOAN_TERMS_SUCCESS &&
                                        <Fragment>
                                            <div dangerouslySetInnerHTML={{ __html: this.props.loan_terms.terms_data.response.Response }} />
                                        </Fragment>
                                    }

                                    {this.props.loan_terms && this.props.loan_terms.terms_status == loanConstants.LOAN_TERMS_PENDING &&
                                        <Fragment>
                                            <span> Fetching terms and conditions...</span>
                                        </Fragment>
                                     }

                                     {this.props.loan_terms && this.props.loan_terms.terms_status == loanConstants.LOAN_TERMS_FAILURE &&
                                        <Fragment>
                                            <span>{this.props.alert.message}</span><br/>
                                            <a onClick={this.LoadTerms}>Click to try again</a>
                                        </Fragment>
                                     }
                                </div>
                                <div className="term-ctn">
                                {this.props.loan_terms && this.props.loan_terms.terms_status == loanConstants.LOAN_TERMS_SUCCESS && <center>
                                        <a onClick={this.onAccept} className="term-acpt-link" style={{ cursor: "pointer", color: "red" }}>Accept</a>
                                        <a href onClick={this.onDecline} className="grey-text" style={{ cursor: "pointer" }}>Decline</a>
                                    </center>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        score_card_A: state.loanOnboardingReducerPile.loanPostScoreCardAnswer,
        standing_order: state.loanReducerPile.loanStandingOrder,
        loan_reject: state.loanReducerPile.loanReject,
        loan_status: state.loanReducerPile.loanAppStatus,
        loan_terms: state.loanReducerPile.terms
    }
}

export default connect(mapStateToProps)(LoanTermsComponent);