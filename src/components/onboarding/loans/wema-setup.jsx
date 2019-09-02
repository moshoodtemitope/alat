import React, { Fragment } from 'react';

import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
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
        // if (this.props.standing_order)
        //     if (this.props.standing_order.standing_order_status == loanConstants.LOAN_STAND_ORDER_SUCCESS) {
        //         let data = {
        //             ...this.props.standing_order.standing_order_data.response.Response
        //         }
        //         if (data.kycRequired == true)
        //             this.props.history.push('/loans/kyc');
        //        else 
                this.props.history.push('/loans/salary/dashboard')  //url to be completed.
        //     }
        //     else {
        //         this.props.goToPreviousPage()
        //     }
        // this.props.history.push('/loans/kyc');
    }
    
    checkKycStatus=()=>{
        this.props.dispatch(LoanActions.checkKycRequired(this.state.user.token))
    }

    NavigateToKycPage =()=>{
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
                   
                    KycStatus={this.checkKycStatus}
                    NavigateToKyc={this.NavigateToKycPage}
                  
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