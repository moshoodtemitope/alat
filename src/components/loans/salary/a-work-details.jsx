
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import EmployerDetails from '../../../shared/components/loans/_employer-details';
import { Route, Switch } from "react-router-dom";

class LoanEmployerDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user : JSON.parse(localStorage.getItem("user")),
        }
    }

    componentDidMount=()=>{
        this.init();
    }

    OnSubmit =()=>{
        //this.props.dispatch(OnbaordingActions.requestStatement(this.state.user.token));
    }

    init=()=>{
        if(this.props.loan_apply)
        if(this.props.loan_apply.loan_apply_status == loanConstants.LOAN_APPLY_SUCCESS){
         
        }else {
           // this.props.history.push('/loans/salary/calc');
        }
    }

    render(){
        return(
            <EmployerDetails
             token={this.state.user.token}
             ticketUrl={'/loans/salary/ticket'}
             salaryEntryUrl={'/loans/salary/entry'}
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

export default connect(mapStateToProps)(LoanEmployerDetail);