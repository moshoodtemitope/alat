import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import Ticket from '../../../shared/components/loans/_ticket';

class LoanSalaryTicket extends React.Component{
    constructor(props){
        super(props);
    }

    componentDidMount =()=>{

    }

    init = () =>{

    }

    render(){
        return(
            <Ticket 
            backwardUrl= {"/loans/salary/detail"}
            forwardUrl = {"/loans/salary/entry"}
            />
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert,
        loan_apply: state.loanReducerPile.loanApply,
        industries: state.loanReducerPile.loanIndustries,
    }
}

export default connect(mapStateToProps)(LoanSalaryTicket);

