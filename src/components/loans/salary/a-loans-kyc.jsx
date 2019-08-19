import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import  LoanKycComponent  from '../../../shared/components/loans/_kyc';

class LoansKYC extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<LoanKycComponent />);
    }
}

export default LoansKYC;