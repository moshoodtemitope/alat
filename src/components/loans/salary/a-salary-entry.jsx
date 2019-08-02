import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";

class LoanSalaryEntry extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<h1>Salary Entry</h1>);
    }
}

function mapStateToProps(state){
    return {
        state: state.alert,
        loan_apply: state.loanReducerPile.loanApply,
    }
}

export default connect (mapStateToProps)(LoanSalaryEntry);