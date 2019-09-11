import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import WemaCollectionComponent from '../../../shared/components/loans/_wema-setup';

class WemaCollectionSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            user: JSON.parse(localStorage.getItem("user")),
        }
    }

    onDoneClick = () => {
        // this.props.history.push('/loans/salary/dashboard')
        // if (this.props.standing_order){
        //     if (this.props.standing_order.loan_standOrder_status == loanConstants.LOAN_STAND_ORDER_SUCCESS) {
        //         var data = {
        //             ...this.props.standing_order.loan_standOrder_data.response.Response
        //         }
        //         if (data.kycRequired == true) {
        //             this.props.history.push('/loans/salary/kyc');
        //         }
                this.props.dispatch(LoanActions.clearLoanOnboardingStore());
                this.props.history.push('/loans/salary/dashboard')
            // }
            // else {
            //     this.props.goToPreviousPage()
            // }
        // }

        // if(this.props.mandate){
        //     if(this.props.mandate.loan_mandate_status == loanConstants.LOAN_MANDATE_STATUS_SUCCESS){
        //         var data = {
        //             ...this.props.mandate.loan_mandate_data.response
        //         }
        //     }
        // }
    }

    checkKycStatus=()=>{
        this.props.dispatch(LoanActions.checkKycRequired(this.state.user.token))
    }

    NavigateToKycPage =()=>{
        this.props.history.push('/loans/salary/kyc');
    }

    goBack = () => {
        this.props.history.push('/loans/salary/terms');
    }

    render() {
        return (<WemaCollectionComponent
            doneClick={this.onDoneClick}
            KycStatus={this.checkKycStatus}
            NavigateToKyc={this.NavigateToKycPage}
            goToPreviousPage={this.goBack}
        />)
    }
}

function mapStateToProps(state) {
    return {
        standing_order: state.loanReducerPile.loanStandingOrder,
        mandate: state.loanReducerPile.loanMandate,
    }
}

export default connect(mapStateToProps)(WemaCollectionSetup)