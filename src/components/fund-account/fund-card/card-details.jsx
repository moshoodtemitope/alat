import React from 'react';
import { connect } from 'react-redux';

import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import AmountInput from '../../../shared/components/amountInput';
import * as actions from '../../../redux/actions/fund-account/fund-acount.action';
import { fundAccountConstants } from '../../../redux/constants/fund-account/fund-account.constant';
import { alertActions } from '../../../redux/actions/alert.actions';

class FundCardDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="al-card no-pad">
                <h4 class="m-b-10 center-text hd-underline">Card Details</h4>

                <div class="transfer-ctn">
                    <form>
                        <div class="input-ctn">
                            <label>Card Number</label>
                            <input type="tel" />
                        </div>

                        <div class="row">
                            <div class="col-sm-6 col-md-6">
                                <div class="input-ctn">
                                    <label>Expires</label>
                                    <input type="text" placeholder="MM/YY" />
                                </div>
                            </div>

                            <div class="col-sm-6 col-md-6">
                                <div class="input-ctn">
                                    <label>CVV</label>
                                    <input type="tel" />
                                </div>
                            </div>
                        </div>

                        <div class="input-ctn">
                            <input type="checkbox" class="lcard-save" /> Save card details for future transactions
							                </div>

                        <div class="input-ctn lcard-form">
                            <label>Give card a name</label>
                            <input type="text" />
                        </div>

                        <div class="row">
                            <div class="col-sm-12">
                                <center>
                                    <input type="button" value="Save and proceed" class="btn-alat m-t-10 m-b-20 text-center" />
                                </center>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        alert: state.alert
    }
}

export default connect(mapStateToProps)(FundCardDetails);