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

    render() {
        return (<LoanOnboardingContainer>
            <h1>Statement Upload</h1>
        </LoanOnboardingContainer>);
    }
}

function mapStateToProps(state) {
    return {

    }
}
export default connect(mapStateToProps)(LoanOnboardingStatementUpload);