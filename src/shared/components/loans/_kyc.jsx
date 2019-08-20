import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as actions from '../../../redux/actions/loans/loans.action';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import * as util from '../../utils';
import { CollectionScreenOption } from '../../constants';


//temporary component to test my entire collection flow.
class LoanKycComponent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<h1>KYC Component</h1>);
    }
}

function mapStateToProps(state){
    return{

    }
}

export default connect(mapStateToProps)(LoanKycComponent);