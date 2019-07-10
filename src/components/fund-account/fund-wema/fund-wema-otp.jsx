import React from 'react';
import { connect } from 'react-redux';

import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AmountInput from '../../../shared/components/amountInput';
import * as actions from '../../../redux/actions/fund-account/fund-acount.action';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
import { alertActions } from '../../../redux/actions/alert.actions';
import OtpValidation from '../../../shared/components/otpvalidation';

class FundWemaOTP extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <OtpValidation />
            );
    }
}

function mapStateToProps(state) {
    return {
        //fundwith_tokencard: state.fundAccountReducerPile.fundFromCardToken,
        //fundwith_pin: state.fundAccountReducerPile.fundfromWithPin,
        card_details: state.fundAccountReducerPile.cardDetails,
        fund_account: state.fundAccountReducerPile.fundAccount,
        save_card: state.fundAccountReducerPile.saveTransCard,
        alert : state.alert
    };
}

export default connect(mapStateToProps)(FundCardSuccess);