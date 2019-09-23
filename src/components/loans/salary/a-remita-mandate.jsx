import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import  RemitaMandateSetupComponent  from '../../../shared/components/loans/_remita-mandate-setup';
//Remita Bank Mandate setup using Reference number
class LoanRemitaMandateSetUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        }
    }

    confirmClick =()=>{
        this.props.dispatch(LoanActions.loanMandateStatus(this.state.user.token));
    }

    NavigateToCollectionDone =()=>{
        this.props.history.push("/loans/salary/wema-setup");
    }

    checkKycStatus=()=>{
        //this.props.dispatch();
        this.props.history.push("/loans/salary/kyc");
    }

    goBack=()=>{}

    render() {
        return (<RemitaMandateSetupComponent
            onConfirm={this.confirmClick}
            NavigateToCollectionDone ={this.NavigateToCollectionDone}
            NavigateToKyc= {this.checkKycStatus}
            NavigateToPreviousPage = {this.goBack}
        />);
    }
}

function mapStateToProps(state) {
    return {

    };
}
export default connect(mapStateToProps)(LoanRemitaMandateSetUp)