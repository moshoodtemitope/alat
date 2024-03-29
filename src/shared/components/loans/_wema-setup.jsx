import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import * as util from '../../utils';
import { CollectionScreenOption } from '../../constants';

class WemaCollectionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            data: {},
            kycRequired: "",
            kycSet : false
        }

    }

    componentDidMount = () => {
        this.init();
    }

    init = () => {
        // console.log(this.props.standing_order);
        if (this.props.standing_order) {
            if (this.props.standing_order.loan_standOrder_status == loanConstants.LOAN_STAND_ORDER_SUCCESS) {
                var data = {
                    ...this.props.standing_order.loan_standOrder_data.response
                }
                this.setState({ data: data, kycRequired: data.Response.kycRequired });

            }
            else {
                this.props.goToPreviousPage()
            }
        }

        if (this.props.mandate) {
            if (this.props.mandate.loan_mandate_status == loanConstants.LOAN_MANDATE_STATUS_SUCCESS) {
                var data = {
                    ...this.props.mandate.loan_mandate_data.response
                }
                this.setState({ data: data }, () => {
                    this.props.KycStatus();
                });
            }
        }
    }
    
    setKycRequired=()=>{
      if(this.props.kyc_required && this.state.kycSet == false){
          if(this.props.kyc_required.kyc_required_status == loanConstants.LOAN_KYCREQUIRED_SUCCESS){
              var data = {
                  ...this.props.kyc_required.kyc_required_data.response
              };
              this.setState({ kycRequired : data.Response.KycRequired, kycSet: true});
          }
      }
    }

    doneClick = () => {
        if(this.state.kycRequired == false)
        {
             this.props.doneClick();
        }
        else {this.props.NavigateToKyc();}
    }

    render() {
        this.setKycRequired();
        return (<div className="row">
            <div className="col-sm-12">
                <div className="max-460">
                    <div className="loan-header-text text-center">
                        {this.state.data.Message && <h4 className="text-black"><span>{this.state.data.Message}</span><br /><span></span></h4>}
                        {/* <h4 className="text-black"><span>Congratulations! We are currently generating your loan account.</span><br /><span></span></h4> */}
                        <p>Thank you for choosing ALAT Salary Loans.</p>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <center>
                                <button type="button" onClick={this.doneClick}
                                    className="btn-alat m-t-10 m-b-20 text-center">Done</button>
                            </center>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        score_card_A: state.loanOnboardingReducerPile.loanPostScoreCardAnswer,
        standing_order: state.loanReducerPile.loanStandingOrder,
        loan_reject: state.loanOnboardingReducerPile.loanRejectReducer,
        mandate: state.loanReducerPile.loanMandate,
        kyc_required: state.loanReducerPile.kycrequired
    }
}

export default connect(mapStateToProps)(WemaCollectionComponent);