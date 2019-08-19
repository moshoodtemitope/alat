import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import LoanOnboardingContainer from './loanOnboarding-container';
import * as util from '../../../shared/utils';
import WemaCollectionComponent from '../../../shared/components/loans/_wema-setup';


class LoanOnboardingWemaSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
			user: JSON.stringify(localStorage.getItem("user")),
		}

    }

    onDoneClick = () => {
        if (this.props.standing_order)
            if (this.props.standing_order.standing_order_status == loanConstants.LOAN_STAND_ORDER_SUCCESS) {
                let data = {
                    ...this.props.standing_order.standing_order_data.response.Response
                }
                if (data.kycRequired == true)
                    this.props.history.push('/loans/kyc');
                else this.props.history.push('/loans')  //url to be completed.
            }
            else {
                this.props.goToPreviousPage()
            }
        this.props.history.push('/loans/kyc');
    }

    goBack = () => {
        this.props.history.push('/loans/terms');
    }

    render() {
        return (
            <LoanOnboardingContainer UserName={this.state.user.fullName}>
                <WemaCollectionComponent
                    doneClick={this.onDoneClick}
                    goToPreviousPage={this.goBack}
                />
            </LoanOnboardingContainer>)
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        standing_order: state.loanOnboardingReducerPile.loanStandingOrder,
    }
}

export default connect(mapStateToProps)(LoanOnboardingWemaSetup);