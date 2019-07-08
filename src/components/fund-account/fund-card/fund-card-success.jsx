import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Switch } from '../../../shared/elements/_toggle';
import {cc_format, formatCardExpiryDate, checkValue} from '../../../shared/utils';

import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AmountInput from '../../../shared/components/amountInput';
import * as actions from '../../../redux/actions/fund-account/fund-acount.action';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
import { alertActions } from '../../../redux/actions/alert.actions';

class FundCardSuccess extends React.Component{
    constructor(props){
        super(props);
    }
}