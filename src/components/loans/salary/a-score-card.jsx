import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import ScoreCard from '../../../shared/components/loans/_score-card';

class LoanScoreCard extends React.Component{
    constructor(props){
        super(props);
    }

    goForward=()=>{
        this.props.history.push('/loans/salary/card-result');
    }

    goBackward=()=>{
        this.props.history.push('/loans/salary/entry');
    }

    NavigateToLoanDashBoard=()=>{
        this.props.history.push('/loans/salary/dashboard');
    }

    render(){
        return(<ScoreCard 
                forwardUrl={'/loans/salary/card-result'}
                backwardUrl={'/loans/salary/entry'}
                gotoNextPageMethod={this.goForward}
                gotoPreviosuPageMethod={this.goBackward}
                gotoDashBoard={this.NavigateToLoanDashBoard}
        />);
    }
}

function mapStateToProps(state){
    return{
    
    };
}

export default connect(mapStateToProps)(LoanScoreCard);