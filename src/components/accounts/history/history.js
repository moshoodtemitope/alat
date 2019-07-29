import React, { Component, Fragment } from 'react';
import Accounts from './_accounts';
import Info from './_info';
import SendReceipt from './_send-receipt';
import Search from './_search';
import TransactionHistory from './_trans-history';
import * as actions from '../../../redux/actions/accounts/export';

import { formatAmount } from '../../../shared/utils';
import { connect } from 'react-redux';
import { getAccounts } from "../../../redux/actions/dashboard/dashboard.actions";

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: null,
            accounts: [],
            accountsLoaded: false,
            invalidInterval: false,
            startDate: null,
            endDate: null,
            keyword: null,
            isReceipt: false,
            take: 10,
            skip: 0,
            isBackendSearch: false,
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
        let payload = {
            Take: this.state.take,
            Skip: this.state.skip,
            AccountNumber: this.state.selectedAccount == null && !this.state.accounts[0] && arrayToDisplay[0].value == '' ? arrayToDisplay[0].value : this.state.selectedAccount ? this.state.selectedAccount.value : arrayToDisplay[0].value,
        };

        this.setState({ accounts: arrayToDisplay, accountsLoaded: true }, () => this.fetchTransactionHistory(payload));
    }

    fetchTransactionHistory = (payload, accountNumber) => {
        if (!payload) {
            payload = {
                Take: this.state.take,
                Skip: this.state.skip,
                AccountNumber: accountNumber,
                From: this.state.isBackendSearch ? this.state.startDate : null,
                To: this.state.isBackendSearch ? this.state.endDate : null,
                KeyWord: this.state.isBackendSearch ? this.state.keyword : null,
            };
        }
        console.log("payload", payload)
        this.props.fetchHistory(this.state.user.token, payload);
    }

    accountChangedHandler = (selectedAccount) => {
        this.props.clearHistory();
        this.setState({ selectedAccount, skip: 0, isBackendSearch: false }, () => this.fetchTransactionHistory(null, selectedAccount.value));

        console.log(`Option selected:`, selectedAccount);
    }

    viewMoreTransactions = () => {
        let account = this.state.selectedAccount == null && !this.state.accounts[0] && this.state.accounts[0].value == '' ? this.state.accounts[0].value : this.state.selectedAccount ? this.state.selectedAccount.value : this.state.accounts[0].value;
        this.setState({ skip: this.state.skip + 10 }, () => this.fetchTransactionHistory(null, account))
    }

    handleStartDatePicker = (startDate) => {
        startDate.setHours(startDate.getHours() + 1);
        console.log(startDate)
        this.setState({ startDate });
    }

    handleEndDatePicker = (endDate) => {
        endDate.setHours(endDate.getHours() + 1);
        console.log(endDate)
        this.setState({ endDate });
    }

    toggleIsReceipt = (event) => {
        event.preventDefault();
        // if(this.state.isReceipt){
        //     this.props.clearHistory();
        //     this.setState({skip : 0},() => this.fetchTransactionHistory({Take: this.state.take, Skip: this.state.skip, AccountNumber: selectedAccount.value,}));
        //     return;
        // }
        this.setState({ isReceipt: !this.state.isReceipt })/**,skip : 0 }, () => this.props.fetchReceiptTransaction(this.state.user.token, {
            accountNumber: this.state.selectedAccount != null ? this.state.selectedAccount.value : this.state.accounts[0].value,
            take: this.state.take,
            skip: 0// this.state.skip,
        }))*/
    }

    searchTransactions(e) {

        let searchText = e.target.value;
        document.querySelectorAll('.history-ctn').forEach((historyctn) => {
            let searchData = historyctn.querySelector('.narr-text').textContent.toLowerCase() + historyctn.querySelector('.amount-s').textContent.toLowerCase();
            if (searchData.indexOf(searchText.toLowerCase()) > -1) {

                if (historyctn.classList.contains('hide')) {
                    historyctn.classList.remove('hide');
                }
            }
            else {
                historyctn.classList.add('hide');

            }
        });
    }

    searchFromBackend = (event) => {
        event.preventDefault();
        if(this.state.startDate && this.state.endDate){
            if(Date.parse(this.state.startDate) > Date.parse(this.state.endDate)){
                this.setState({invalidInterval: true});
                return;
            }
        }
        this.setState({invalidInterval: false}, () => this.props.clearHistory());
        let selected = this.state.selectedAccount ? this.state.selectedAccount.value : this.state.accounts[0].value;
        this.setState({ skip: 0, isBackendSearch: true }, () => this.fetchTransactionHistory(null, selected));
    }

    render() {
        if (this.props.accounts.length >= 1 && !this.state.accountsLoaded) {
            this.sortAccountsForSelect();
        }

        const { selectedAccount, accounts, startDate, endDate, isReceipt, invalidInterval } = this.state;
        return (
            <Fragment>
                <div class="col-sm-12 col-md-4">
                    <Accounts
                        selectedAccount={selectedAccount}
                        options={accounts}
                        changeAccount={this.accountChangedHandler}
                        error={this.props.alert.message}
                        aLength={this.props.accounts.length}
                        retryFetch={() => this.props.fetchDebitableAccounts(this.state.user.token, false)} />
                    <Info
                        available={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `₦${formatAmount(accounts[0].available)}` : `₦${formatAmount(selectedAccount.available)}`}
                        book={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `₦${formatAmount(accounts[0].book)}` : `₦${formatAmount(selectedAccount.book)}`}
                        liened={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `₦${formatAmount(accounts[0].liened)}` : `₦${formatAmount(selectedAccount.liened)}`}
                        uncleared={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `₦${formatAmount(accounts[0].uncleared)}` : `₦${formatAmount(selectedAccount.uncleared)}`}
                    />
                    <SendReceipt
                        receipt={this.toggleIsReceipt}
                        sendReceipt={isReceipt} />
                </div>
                <div class="col-sm-12 col-md-8">
                    <Search
                        start={startDate}
                        end={endDate}
                        changeStart={this.handleStartDatePicker}
                        changeEnd={this.handleEndDatePicker}
                        search={this.searchTransactions}
                        searchFilter={this.searchFromBackend}
                        invalidDate={invalidInterval}
                    />
                    <TransactionHistory
                        accountsLoaded={accounts.length}
                        history={this.props.historyList}
                        historyLength={this.props.historyList.length}
                        sendReceipt={isReceipt}
                        receivedTransactions={this.props.noReceived}
                        fetchingHistory={this.props.fetching}
                        viewMore={this.viewMoreTransactions}
                    //callSendReceipt={}
                    //isSending={}
                    />
                </div>
            </Fragment>

        )
    }
}


const mapStateToProps = state => {
    return {
        accounts: state.dashboard_accounts.user_account_data && state.dashboard_accounts.user_account_data.response ? state.dashboard_accounts.user_account_data.response.Accounts : state.dashboard_accounts,
        alert: state.alert,
        fetching: state.accountsM_reducer.isFetchingHistory,
        historyList: state.accountsM_reducer.history,
        noReceived: state.accountsM_reducer.receivedTransactions,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDebitableAccounts: (token, withHistory) => dispatch(getAccounts(token, withHistory)),
        fetchHistory: (token, payload) => dispatch(actions.fetchAccountHistory(token, payload)),
        clearHistory: () => dispatch(actions.clearCurrentHistory()),
        fetchReceiptTransaction: (token, payload) => dispatch(actions.fetchReceiptEnableTransaction(token, payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);