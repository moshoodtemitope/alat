import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as LoanActions from '../../../redux/actions/loans/loans.action';
import * as OnbaordingActions from '../../../redux/actions/onboarding/loan.actions';
import { loanConstants } from '../../../redux/constants/loans/loans.constants';
import { Route, Switch } from "react-router-dom";
import  WemaCollectionComponent  from '../../../shared/components/loans/_wema-setup';

class WemaCollectionSetup extends React.Component {
    constructor(props) {
        super(props);
    }

    onDoneClick = () => {
        if (this.props.standing_order)
            if (this.props.standing_order.standing_order_status == loanConstants.LOAN_STAND_ORDER_SUCCESS) {
                let data = {
                    ...this.props.standing_order.standing_order_data.response.Response
                }
                if(data.kycRequired == true)
                this.props.history.push('/loans/salary/kyc');
                else this.props.history.push('/loans')  //url to be completed.
            }
            else { 
                this.props.goToPreviousPage()
            }
        this.props.history.push('/loans/salary/kyc');
    }

    goBack= ()=>{
        this.props.history.push('/loans/salary/terms');
    }

    render() {
        return (<WemaCollectionComponent
            doneClick={this.onDoneClick}
            goToPreviousPage={this.goBack}
        />)
    }
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps)(WemaCollectionSetup)