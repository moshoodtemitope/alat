import React, { Component, Fragment } from 'react';
import Select from "react-select";
import { Redirect } from 'react-router-dom';
import { formatAmount, mapCurrency } from '../../../shared/utils';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './statement.css';
import { getAccounts } from "../../../redux/actions/dashboard/dashboard.actions";
import * as actions from '../../../redux/actions/accounts/export';

class Statement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAccount: null,
            accounts: [],
            accountsLoaded: false,
            startDate: null,
            endDate: null,
            invalidInterval: false,
            emptyDate: false,
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
                label: data.AccountType + " - "+mapCurrency(data.Currency) + formatAmount(data.AvailableBalance),
            })));
        } else {
            arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available' }];
        }
        console.log(arrayToDisplay);

        this.setState({ accounts: arrayToDisplay, accountsLoaded: true });
    }

    accountChangedHandler = (selectedAccount) => {
        this.setState({ selectedAccount });

        console.log(`Option selected:`, selectedAccount);
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

    onSubmitData = (event) => {
        event.preventDefault();
        if (this.state.startDate == null || this.state.endDate == null) {
            this.setState({ emptyDate: true });
            return;
        }
        if (this.state.startDate && this.state.endDate) {
            if (Date.parse(this.state.startDate) > Date.parse(this.state.endDate)) {
                this.setState({ invalidInterval: true, emptyDate: false });
                return;
            }
        }
        this.setState({ emptyDate: false, invalidInterval: false });
        let payload = {
            AccountNumber: this.state.selectedAccount == null && !this.state.accounts[0] && this.state.accounts[0].value == '' ? this.state.accounts[0].value : this.state.selectedAccount ? this.state.selectedAccount.value : this.state.accounts[0].value,
            StartDate: this.state.startDate,
            EndDate: this.state.endDate,
        }

        console.log(payload);
        this.props.sendStatement(this.state.user.token, payload);
    }

    render() {
        if (this.props.accounts.length >= 1 && !this.state.accountsLoaded) {
            this.sortAccountsForSelect();
        }
        const { accounts, selectedAccount, startDate, endDate, invalidInterval, emptyDate } = this.state;

        let statement = (
            <Fragment>

                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                {(this.props.alert.message) ?
                                    <div className={`info-label mb-3 ${this.props.alert.type}`}>{this.props.alert.message} {this.props.alert.message.indexOf("rror") != -1 ? <span onClick={() => { this.props.fetchDebitableAccounts(this.state.user.token) }} style={{ textDecoration: "underline", cursor: "pointer" }}>Click here to try again</span> : null}</div> : null
                                }
                                <div className="al-card no-pad">

                                    <div className="transfer-ctn" style={{ padding: "30px 30px" }}>
                                        <h4 className="mb-3">Get Your E-Statement</h4>
                                        <p className="s-info mb-4">Your account statement for the selected period will be sent to your email address</p>
                                        <form>

                                            <div className="row">
                                                <div className="input-ctn col-md-12">
                                                    <label>Select an account</label>
                                                    <Select
                                                        value={selectedAccount == null ? accounts.length > 0 ? accounts[0] : accounts : selectedAccount}
                                                        onChange={this.accountChangedHandler}
                                                        options={accounts}
                                                        placeholder={this.props.alert.message ? "Failed. Please try again" : (this.props.accounts.length > 0 ? "Select..." : "Loading Account...")}
                                                    />
                                                </div>
                                                <div className="col-md-6 input-ctn">
                                                    <label>Start Date</label>
                                                    <DatePicker placeholderText="" selected={startDate}
                                                        onChange={this.handleStartDatePicker}
                                                        //onChangeRaw={(e) => this.handleChange(e)}
                                                        dateFormat="d MMMM, yyyy"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        maxDate={new Date()}
                                                    />
                                                </div>
                                                <div className="col-md-6 input-ctn ">
                                                    <label>End Date</label>
                                                    <DatePicker placeholderText="" selected={endDate}
                                                        onChange={this.handleEndDatePicker}
                                                        //onChangeRaw={(e) => this.handleChange(e)}
                                                        dateFormat="d MMMM, yyyy"
                                                        peekNextMonth
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        maxDate={new Date()}
                                                    />
                                                </div>
                                                {invalidInterval ? <p className="text-center text-danger" style={{ margin: "0px auto" }}>Start date cannot exceed end date</p> : null}
                                                {emptyDate ? <p className="text-center text-danger" style={{ margin: "0px auto" }}>Please select both start and end date</p> : null}
                                               
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <button onClick={this.onSubmitData} disabled={this.props.sending} className="btn-alat m-t-10 m-b-20 text-center">{this.props.sending ? "Processing..." : "Request Statement"}</button>
                                                        </center>
                                                    </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );

        // if(this.props.alert.type == "ALERT_SUCCESS"){
        //     setTimeout(() => {
        //         statement=    <Redirect to='/accounts/accounts-history' />;
        //         }, 5000);
        //     }

        return statement;
    }
}

const mapStateToProps = state => {
    return {
        accounts: state.dashboard_accounts.user_account_data && state.dashboard_accounts.user_account_data.response ? state.dashboard_accounts.user_account_data.response.Accounts : state.dashboard_accounts,
        alert: state.alert,
        fetching: state.accountsM_reducer.isFetchingHistory,
        sending: state.accountsM_reducer.isFetching,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDebitableAccounts: (token, withHistory) => dispatch(getAccounts(token, withHistory)),
        sendStatement: (token, payload) => dispatch(actions.sendStatement(token, payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Statement);