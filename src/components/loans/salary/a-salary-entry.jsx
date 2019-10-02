import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import SalaryEntry from '../../../shared/components/loans/_salary-entry';

class LoanSalaryEntry extends React.Component{
    constructor(props){
        super(props);
    }
    
    gotoNextPage=()=>{
        this.props.history.push('/loans/salary/score-card');
    }

    gotoPreviousPage=()=>{
        this.props.history.push('/loans/salary/detail');
    }

    NavigateToLoanDashBoard=()=>{
        this.props.history.push('/loans/salary/dashboard');
    }

    render(){
        return(<SalaryEntry
              forwardUrl = {'/loan/salary/score-card'}
              backwardUrl= {'/loan/salary/detail'}
              NextPageMethod={this.gotoNextPage}
              PreviousPageMethod={this.PreviousPageMethod}
              gotoDashBoard={this.NavigateToLoanDashBoard}
            />);
    }
}

function mapStateToProps(state){
    return {
        state: state.alert,
        loan_apply: state.loanReducerPile.loanApply,
    }
}

export default connect (mapStateToProps)(LoanSalaryEntry);