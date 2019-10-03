import React, { Component, Fragment } from 'react';
import Accounts from './_accounts';
import Info from './_info';
import SendReceipt from './_send-receipt';
import Search from './_search';
import TransactionHistory from './_trans-history';
import * as actions from '../../../redux/actions/accounts/export';

import { formatAmount, mapCurrency } from '../../../shared/utils';
import { connect } from 'react-redux';
import { getAccounts } from "../../../redux/actions/dashboard/dashboard.actions";
import './history.css';

let boxDefault = {
    show1: false,
    show2: false,
    show3: false,
    show4: false,
};
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
            infoBox: {
                show1: false,
                show2: false,
                show3: false,
                show4: false,
            },
            currentShowedBox: "0",
            showDropOptions: false,
            currentTransactions: "All",
            currency: "",
            searchText: ""
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
                label: data.AccountType + " - "+ mapCurrency(data.Currency) + formatAmount(data.AvailableBalance),
                currency: mapCurrency(data.Currency),
                available: data.AvailableBalance,
                book: data.BookBalance,
                liened: data.LienAmount,
                uncleared: data.UnClearedAmount,
            })));
        } else {
            arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available' }];
        }
        // console.log(arrayToDisplay)
        let payload = {
            Take: this.state.take,
            Skip: this.state.skip,
            AccountNumber: this.state.selectedAccount == null && !this.state.accounts[0] && arrayToDisplay[0].value == '' ? arrayToDisplay[0].value : this.state.selectedAccount ? this.state.selectedAccount.value : arrayToDisplay[0].value,
        };

        this.setState({ accounts: arrayToDisplay, currency: mapCurrency(arrayToDisplay[0].currency) || "*", accountsLoaded: true, currentTransactions: "All" }, () => this.fetchTransactionHistory(payload));
    }

    fetchTransactionHistory = (payload, accountNumber) => {
        this.checkInfoState();
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
        // console.log("payload", payload)
        this.props.fetchHistory(this.state.user.token, payload, this.state.currentTransactions);
    }

    accountChangedHandler = (selectedAccount) => {
        this.checkInfoState();
        let currentAccount = this.state.selectedAccount != null ? this.state.selectedAccount.value : this.state.accounts[0].value;
        if (selectedAccount.value == currentAccount) return;
        this.props.clearHistory();
        if (this.state.currentTransactions == "Receipts") {
            this.setState({ selectedAccount, skip: 0, take: 10, isBackendSearch: false }, () => this.props.fetchReceiptTransaction(this.state.user.token, {
                take: this.state.take,
                skip: this.state.skip,
                accountNumber: selectedAccount.value,
            }));
        }
        this.setState({ selectedAccount, skip: 0, take: 10, isBackendSearch: false, currentTransactions: "All", currency : selectedAccount.currency }, () => this.fetchTransactionHistory(null, selectedAccount.value));

        // console.log(`Option selected:`, selectedAccount);
    }

    viewMoreTransactions = () => {
        this.checkInfoState();
        let account = this.state.selectedAccount != null ? this.state.selectedAccount.value : this.state.accounts[0].value;
        if (this.state.currentTransactions == "Receipts") {
            this.setState({ skip: this.state.skip + 10, take: 10 }, () => this.props.fetchReceiptTransaction(this.state.user.token, {
                accountNumber: account,
                take: this.state.take,
                skip: this.state.skip,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
            }));
        } else {
            if (this.state.currentTransactions == "All") {
                this.setState({ skip: this.state.skip + 10, take: 10 }, () => this.fetchTransactionHistory(null, account))
            } else {
                this.setState({ skip: this.state.skip + 30, take: 30 }, () => this.fetchTransactionHistory(null, account))
            }

        }
    }

    handleStartDatePicker = (startDate) => {
        this.checkInfoState();
        startDate.setHours(startDate.getHours() + 1);
        // console.log(startDate)
        this.setState({ startDate });
    }

    handleEndDatePicker = (endDate) => {
        this.checkInfoState();
        endDate.setHours(endDate.getHours() + 1);
        // console.log(endDate)
        this.setState({ endDate });
    }

    toggleFilter = (type) => {
        this.setState({ showDropOptions: !this.state.showDropOptions })
        this.checkInfoState();
        if (this.state.currentTransactions == type) return;
        this.props.clearHistory();
        switch (type) {
            case "All":
                this.setState({ isReceipt: false, skip: 0, take: 10, currentTransactions: "All" }, () => this.fetchTransactionHistory({
                    Take: this.state.take,
                    Skip: this.state.skip,
                    AccountNumber: this.state.selectedAccount != null ? this.state.selectedAccount.value : this.state.accounts[0].value,
                }));
                break;
            case "Debits":
                this.setState({ isReceipt: false, skip: 0, take: 30, currentTransactions: "Debits" }, () => this.fetchTransactionHistory({
                    Take: this.state.take,
                    Skip: this.state.skip,
                    AccountNumber: this.state.selectedAccount != null ? this.state.selectedAccount.value : this.state.accounts[0].value,
                }));
                break;
            case "Credits":
                this.setState({ isReceipt: false, skip: 0, take: 30, currentTransactions: "Credits" }, () => this.fetchTransactionHistory({
                    Take: this.state.take,
                    Skip: this.state.skip,
                    AccountNumber: this.state.selectedAccount != null ? this.state.selectedAccount.value : this.state.accounts[0].value,
                }));
                break;
            default:
                    this.setState({ isReceipt: true, skip: 0, take: 10, currentTransactions: "Receipts" }, () => this.props.fetchReceiptTransaction(this.state.user.token, {
                        accountNumber: this.state.selectedAccount != null ? this.state.selectedAccount.value : this.state.accounts[0].value,
                        take: this.state.take,
                        skip: this.state.skip,
                    }));
                break;
        }
    }

    toggleIsReceipt = (event) => {
        this.checkInfoState();
        event.preventDefault();
        this.props.clearHistory();
        if (this.state.currentTransactions == "Receipts") {
            this.setState({ isReceipt: false, skip: 0, take: 10, currentTransactions: "All" }, () => this.fetchTransactionHistory({
                Take: this.state.take,
                Skip: this.state.skip,
                AccountNumber: this.state.selectedAccount != null ? this.state.selectedAccount.value : this.state.accounts[0].value,
            }));
        } else {
            this.setState({ isReceipt: true, skip: 0, take: 10, currentTransactions: "Receipts" }, () => this.props.fetchReceiptTransaction(this.state.user.token, {
                accountNumber: this.state.selectedAccount != null ? this.state.selectedAccount.value : this.state.accounts[0].value,
                take: this.state.take,
                skip: this.state.skip,
            }));
        }
    }

    searchTransactions = (e) => {
        this.checkInfoState();
        let searchText = e.target.value;
        this.setState({ searchText : searchText})
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
        this.checkInfoState();
        if (this.state.startDate && this.state.endDate) {
            if (Date.parse(this.state.startDate) > Date.parse(this.state.endDate)) {
                this.setState({ invalidInterval: true });
                return;
            }
        }
        this.setState({ invalidInterval: false }, () => this.props.clearHistory());
        let selected = this.state.selectedAccount ? this.state.selectedAccount.value : this.state.accounts[0].value;
        if (this.state.currentTransactions == "Receipts") {
            this.setState({ skip: 0, take: 10, isBackendSearch: true }, () => this.props.fetchReceiptTransaction(this.state.user.token, {
                accountNumber: selected,
                take: this.state.take,
                skip: this.state.skip,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            }));
        } else {
            this.setState({ skip: 0, take: 10, isBackendSearch: true, currentTransactions: "All" }, () => this.fetchTransactionHistory(null, selected));
        }
    }

    sendTransReceipt = (identifier, identifierId) => {
        this.checkInfoState();
        this.props.clear(1);
        let payload = {
            Identifier: parseInt(identifier),
            IdentifierId: parseInt(identifierId),
            AccountNumber: this.state.selectedAccount ? this.state.selectedAccount.value : this.state.accounts[0].value,
        }
        this.props.sendTransactionReceipt(this.state.user.token, payload);
    }

    checkInfoState = () => {
        if (this.state.currentShowedBox != "0") {
            this.setState({ infoBox: boxDefault, currentShowedBox: "0" })
        }
    }

    toggleInfoBoxes = (boxNo) => {
        let box = {
            show1: false,
            show2: false,
            show3: false,
            show4: false,
        };
        if (this.state.currentShowedBox == boxNo) {
            this.setState({ infoBox: box, currentShowedBox: "0" })
            return;
        }
        switch (boxNo) {
            case "1":
                box.show1 = true
                break;
            case "2":
                box.show2 = true
                break;
            case "3":
                box.show3 = true
                break;
            case "4":
                box.show4 = true
                break;
            default:
                break;
        }
        this.setState({ infoBox: box, currentShowedBox: boxNo })
    }

    toggleFilterDropdown = () => {
        this.setState({ showDropOptions: !this.state.showDropOptions })
    }

    render() {
        if (this.props.accounts.length >= 1 && !this.state.accountsLoaded) {
            this.sortAccountsForSelect();
        }

        const { selectedAccount, c, accounts,startDate, endDate, isReceipt, invalidInterval, showDropOptions, currentTransactions, currency } = this.state;
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
                        available={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `${currency}${formatAmount(accounts[0].available)}` : `${currency}${formatAmount(selectedAccount.available)}`}
                        book={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `${currency}${formatAmount(accounts[0].book)}` : `${currency}${formatAmount(selectedAccount.book)}`}
                        liened={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `${currency}${formatAmount(accounts[0].liened)}` : `${currency}${formatAmount(selectedAccount.liened)}`}
                        uncleared={!this.props.accounts.length ? "---" : !accounts[0] ? "---" : selectedAccount == null ? `${currency}${formatAmount(accounts[0].uncleared)}` : `${currency}${formatAmount(selectedAccount.uncleared)}`}
                        show1={this.state.infoBox.show1}
                        show2={this.state.infoBox.show2}
                        show3={this.state.infoBox.show3}
                        show4={this.state.infoBox.show4}
                        showInfo={this.toggleInfoBoxes}
                    />
                    <SendReceipt
                        receipt={this.toggleIsReceipt}
                        sendReceipt={currentTransactions == "Receipts"} />
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
                        sendReceipt={currentTransactions == "Receipts"}
                        receipt={this.toggleIsReceipt}
                        receiptSending={this.props.isSendingReceipt}
                        response={this.props.receiptRes}
                        receivedTransactions={this.props.noReceived}
                        fetchingHistory={this.props.fetching}
                        viewMore={this.viewMoreTransactions}
                        receiptHistory={this.props.receiptHistoryList}
                        callSendReceipt={this.sendTransReceipt}
                        showDropdown={this.toggleFilterDropdown}
                        showOptions={showDropOptions}
                        optionTofetch={this.toggleFilter}
                        currentView={currentTransactions}
                        receivedTransactionsAlt={this.props.receivedTransactionsAlternative}
                        currency={currency}
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
        receiptHistoryList: state.accountsM_reducer.receiptHistory,
        noReceived: state.accountsM_reducer.receivedTransactions,
        receivedTransactionsAlternative: state.accountsM_reducer.receivedTransactionsAlt,
        receiptRes: state.accountsM_reducer.receiptResponse,
        isSendingReceipt: state.accountsM_reducer.sendingReceipt,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDebitableAccounts: (token, withHistory) => dispatch(getAccounts(token, withHistory)),
        fetchHistory: (token, payload, type) => dispatch(actions.fetchAccountHistory(token, payload, type)),
        clearHistory: () => dispatch(actions.clearCurrentHistory()),
        fetchReceiptTransaction: (token, payload) => dispatch(actions.fetchReceiptEnableTransaction(token, payload)),
        sendTransactionReceipt: (token, payload) => dispatch(actions.sendTransactionReceipt(token, payload)),
        clear: (status) => dispatch(actions.clearResponse(status)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);