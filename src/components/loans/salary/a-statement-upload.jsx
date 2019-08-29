import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import StatementUpload from '../../../shared/components/loans/_statement-upload';


class LoanStatementUpload extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    goBack=()=>{
        this.props.history.push("/loans/salary/detail");
    }

    goFoward=()=>{
        this.props.history.push('/loans/salary/dashboard');
    }

    render(){
        return(<StatementUpload
                gotoPreviousPageMethod={this.goBack}
                ParentGoToNextPage={this.goForward}
        />);
    }
}

function mapStateToProps(state){
    return{

    }
}

export default connect(mapStateToProps)(LoanStatementUpload);