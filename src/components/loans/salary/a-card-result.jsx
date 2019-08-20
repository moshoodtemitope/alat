import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import ScoreResult from '../../../shared/components/loans/_card-result';

class LoanCardResult extends React.Component{
    constructor(props){
        super(props);
    }
     goForward=()=>{
        this.props.history.push('/loans/salary/terms');
     }

     doneClick=()=>{
        this.props.dispatch(OnbaordingActions.clearLoanOnboardingStore());
        this.props.history.push('/loans');
     }

     goBackWard=()=>{
      this.props.history.push('/loans/salary/score-card');
     }
    render(){
        return(<ScoreResult 
            gotoPreviousPageMethod={this.goBackWard}
            gotoNextPageMethod={this.goForward}
            doneClick={this.doneClick}
        />);
    }
}

function mapStateToProps(state){
    return{

    }
}

export default connect(mapStateToProps)(LoanCardResult);