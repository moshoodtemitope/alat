import React, { Component, Fragment } from 'react';
import Accounts from './_accounts';
import Info from './_info';
import SendReceipt from './_send-receipt';
import Search from './_search';
import TransactionHistory from './_trans-history';

import { alertActions } from "../../../redux/actions/alert.actions";
import { formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';
import { getAccountHistory, getAccounts } from "../../../redux/actions/dashboard/dashboard.actions";

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: null,
            accounts: [],
            accountsLoaded: false,
            startDate: null,
            endDate: null,
            user: JSON.parse(localStorage.getItem("user")),
        };
    }

    componentDidMount() {
        if (!this.props.accounts.length) {
            this.props.fetchDebitableAccounts(this.state.user.token, false)
        }
    }

    sortAccountsForSelect = () => {
        var arrayToDisplay = [];

        if (this.props.accounts.length >= 1) {
            this.props.accounts.map((data => arrayToDisplay.push({
                value: data.AccountNumber,
                label: data.AccountType + " - ₦" + formatAmount(data.AvailableBalance),
                available: data.AvailableBalance,
                book: data.BookBalance,
                liened: data.LienAmount,
                uncleared: data.UnClearedAmount,
            })));
        } else {
            arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available' }];
        }
        console.log(arrayToDisplay)

        this.setState({ accounts: arrayToDisplay, accountsLoaded: true });
    }

    accountChangedHandler = (selectedAccount) => {
        this.setState({ selectedAccount });
        console.log(`Option selected:`, selectedAccount);
    }

    handleStartDatePicker = (startDate) => {
        startDate.setHours( startDate.getHours() + 1 );
        this.setState ({startDate});
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours( endDate.getHours() + 1 );
        this.setState ({endDate});
    }

    render() {
        if (this.props.accounts.length >= 1 && !this.state.accountsLoaded) {
            this.sortAccountsForSelect();
        }

        const { selectedAccount, accounts, startDate, endDate } = this.state;
        return (
            <Fragment>
                <div class="col-sm-12 col-md-4">
                    <Accounts
                        selectedAccount={selectedAccount}
                        options={accounts}
                        changeAccount={this.accountChangedHandler}
                        error={this.props.alert.message}
                        aLength={this.props.accounts.length} />
                    <Info
                        available={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `₦${formatAmount(accounts[0].available)}` : `₦${formatAmount(selectedAccount.available)}`}
                        book={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `₦${formatAmount(accounts[0].book)}` : `₦${formatAmount(selectedAccount.book)}`}
                        liened={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `₦${formatAmount(accounts[0].liened)}` : `₦${formatAmount(selectedAccount.liened)}`}
                        uncleared={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `₦${formatAmount(accounts[0].uncleared)}` : `₦${formatAmount(selectedAccount.uncleared)}`}
                    />
                    <SendReceipt />
                </div>
                <div class="col-sm-12 col-md-8">
                    <Search
                    start={startDate}
                    end={endDate}
                    changeStart={this.handleStartDatePicker}
                    changeEnd={this.handleEndDatePicker} />
                    <TransactionHistory 
                    />
                </div>
            </Fragment>

        )
    }
}


const mapStateToProps = state => {
    return {
        //accounts: state.data_reducer.debitableAccounts,
        accounts: state.dashboard_accounts.user_account_data && state.dashboard_accounts.user_account_data.response ? state.dashboard_accounts.user_account_data.response.Accounts : state.dashboard_accounts,
        //pageState: state.bills_reducer.pageState,
        alert: state.alert,
        fetching: state.bills_reducer.isFetching,
        //subscriberName: state.bills_reducer.subscriberName,
        //phoneNumber: state.authentication.user.phoneNo || state.authentication.user.response.phoneNo,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDebitableAccounts: (token, withHistory) => dispatch(getAccounts(token, withHistory)),
        // setBillInfo: (billData, otpData) => dispatch(actions.setBillInfo(billData, otpData)),
        // fetchOtp: (token, data) => dispatch(actions.fetchOtpForCustomer(token, data)),
        // resetPageState: (code) => dispatch(actions.resetBillPage(code)),
        // clearError: () => dispatch(alertActions.clear()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);