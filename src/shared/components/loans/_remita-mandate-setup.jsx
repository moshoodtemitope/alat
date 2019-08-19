import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import * as util from '../../utils';
import { CollectionScreenOption } from '../../constants';

class RemitaMandateSetupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            collectionModel: {}
        }
    }

    init = () => {
        if (this.props.standing_order)
            if (this.props.standing_order.loan_standOrder_status == loanConstants.LOAN_STAND_ORDER_SUCCESS) {
                var data = {
                    ...this.props.standing_order.loan_standOrder_data.response.Response
                }
                if (data.GetCollectionScreenOption == CollectionScreenOption.RemitaBankSetup) {
                    this.setState({ collectionModel : data});
                }
                else { this.props.NavigateToPreviousPage(); }
            } else {
                this.props.NavigateToPreviousPage();
            }
    }

    confirmClick=()=>{
      this.props.onConfirm();
    }

    gotoNextPage=()=>{
        if(this.props.mandate_status)
        if(this.props.mandate_status.loan_mandate_status == loanConstants.LOAN_MANDATE_STATUS_SUCCESS){
            //call method to check for KYC
            //this.props.checkKycStatus();
            if(this.collectionModel.kycRequired)
            this.props.NavigateToKyc();
            else { //Navigate to another page
             }
        }
    }

    render() {
        this.gotoNextPage();
        return (
            <div className="row">
                <div className="col-sm-12">
                    <div className="max-500">
                        <div className="loan-header-text text-center">
                            <h4 className="text-black">Repayment Mandate Setup.</h4>
                            <p>-Provide your Remita reference number to setup automatic repayment</p>
                            <p>-Cilck on confirm mandate to verify that its done.</p>
                        </div>
                        <div className="al-card no-pad">
                            <div className="transfer-ctn">
                                {this.props.alert && this.props.alert.message &&
                                    <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                }
                                <form>
                                    <div className="input-ctn">
                                        <label>Reference Number</label>
                                        <input type="text" name="remitaRefrence" disabled={true} 
                                        value={this.state.collectionModel.RemitaMandateReference} />
                                    </div>

                                    <div className="row">
                                        <div className="col-sm-12">
                                            <center>
                                            {/* disabled={this.returnGenPendingStat()} */}
                                            {/* value={this.returnGenPendingStat() ? "Processing..." : "Confirm"} */}
                                                <input type="button"  confirmClick={this.confirmClick}
                                                    value={"Confirm"}
                                                    className="btn-alat m-t-10 m-b-20 text-center" />
                                            </center>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        score_card_Q: state.loanOnboardingReducerPile.loanGetScoreCardQuestion,
        score_card_A: state.loanOnboardingReducerPile.loanPostScoreCardAnswer,
        standing_order: state.loanOnboardingReducerPile.loanStandingOrder,
        mandate_status: state.loanOnboardingReducerPile.loanMandate
    }
}

export default connect(mapStateToProps)(RemitaMandateSetupComponent);