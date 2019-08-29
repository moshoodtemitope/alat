import React, { Fragment } from 'react';

import Select from 'react-select';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/onboarding/loan.actions';
import { loanOnboardingConstants } from '../../../redux/constants/onboarding/loan.constants';
import LoanOnboardingContainer from './loanOnboarding-container';

class LoanOnboardingStatementUpload extends React.Component {
    constructor(props) {
        super(props);
    }

    goBack = () => {
        this.props.history.push("/loans/salary-detail");
    }

    goFoward = () => {
        this.props.history.push('/loans/salary/dashboard');
    }

    render() {
        return (<LoanOnboardingContainer>
            <StatementUpload
                gotoPreviousPageMethod={this.goBack}
                ParentGoToNextPage={this.goForward}
            />
        </LoanOnboardingContainer>);
    }
}

function mapStateToProps(state) {
    return {

    }
}
export default connect(mapStateToProps)(LoanOnboardingStatementUpload);