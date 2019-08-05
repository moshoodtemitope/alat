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

    render(){
        return(<ScoreResult 
            forwardUrl={}
            backwardUrl={}
        />);
    }
}

function mapStateToProps(state){
    return{

    }
}

export default LoanCardResult;