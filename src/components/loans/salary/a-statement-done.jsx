import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import StatementUploadDone from '../../../shared/components/loans/_statement-upload-done';

class LoanStatementUploadDone extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    
    NavigateToDashBoard=()=>{
        this.props.dispatch(LoanActions.clearLoanOnboardingStore());
       this.props.history.push('/loans/salary/dashboard');
    }

    render(){
        return(
            <StatementUploadDone 
             gotoDashboard = {this.NavigateToDashBoard}
             />);
    }
}

function mapStateToProps(state){
    return{

    }
}

export default connect(mapStateToProps)(LoanStatementUploadDone);