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
        }
        
    }
    init = () => {
        if (this.props.standing_order)
            if (this.props.standing_order.standing_order_status == loanConstants.LOAN_STAND_ORDER_SUCCESS) {
                let data = {
                    ...this.props.standing_order.standing_order_data.response.Response
                }
            }
            else { 
                this.props.goToPreviousPage()
            }
    }

    doneClick = () => {
        this.props.doneClick();
    }

    render() {
        return (<div className="row">
            <div className="col-sm-12">
                <div className="max-650">
                    <div className="loan-header-text text-center">
                        <h4 className="text-black"><span>You've set up your</span><br /><span>repayment mandate</span></h4>
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
        standing_order: state.loanOnboardingReducerPile.loanStandingOrder,
        loan_reject: state.loanOnboardingReducerPile.loanRejectReducer
    }
}

export default connect(mapStateToProps)(WemaCollectionComponent);