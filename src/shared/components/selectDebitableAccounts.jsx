import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../redux/actions/airtime-bill/airtime.action';
import { airtimeConstants } from '../../redux/constants/airtime/airtime.constants';

class SelectDebitableAccounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            debitableAccounts: {},
            selectedAccount: {},
        };
    }

    componentDidMount() {
        this.loadDebitableAccounts();
    }

    sortAccountsForSelect = () => {
        var arrayToDisplay = [];
        // console.log(this.props.accounts);
        // console.log("this.props.accounts");

        if (this.props.accounts.length >= 1) {
            this.props.accounts.map((data => arrayToDisplay.push({ value: data.AccountNumber, label: data.AccountDescription + " - N" + formatAmount(data.AvailableBalance) })));
        } else {
            arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available' }];
        }
        console.log(arrayToDisplay)

        // const _debitableAccounts = {
        //     ...this.state
        // }
        // _debitableAccounts.debitableAccounts = arrayToDisplay;
        this.setState({ debitableAccounts: arrayToDisplay });

    }

    loadDebitableAccounts = () => {
        if (this.props.accounts)
            if (this.props.accounts.debitable_accounts ==
                airtimeConstants.GET_DEBTABLE_ACCOUNTS_SUCCESS) {

            }
            else {
                this.props.fetchDebitableAccounts(this.props.user.token);
            }
    }

    handleSelectAccount = (e) => {
        this.props.onChange(e.target.value.AccountNumber);
        this.setState({selectedAccount : e.target.value})
    }

    render() {
        return (
            <Fragment>
                {this.props.accounts &&
                    this.props.accounts.debitable_accounts ==
                    airtimeConstants.GET_DEBTABLE_ACCOUNTS_SUCCESS
                    &&
                    <div className={this.props.accountInvalid ? "input-ctn form-error" : "input-ctn"}>
                        <label>Select an account to debit</label>
                        <Select placeholder="Select Account"
                            onChange={this.handleSelectAccount}
                            options={this.props.accounts.debitable_accounts.response}
                            value={this.props.value}
                        />
                        <div className={this.props.accountInvalid ? "input-ctn form-error" : "input-ctn"}>an account is required</div>
                    </div>
                }

                {this.props.accounts &&
                    this.props.accounts.debitable_accounts ==
                    airtimeConstants.GET_DEBTABLE_ACCOUNTS_PENDING
                    &&
                    <div className={this.props.accountInvalid ? "input-ctn form-error" : "input-ctn"}>
                        <label>Select an account to debit</label>
                        <Select placeholder="Loading accounts..."
                            disabled={true}
                        />
                    </div>
                }


                {this.props.accounts &&
                    this.props.accounts.debitable_accounts ==
                    airtimeConstants.GET_DEBTABLE_ACCOUNTS_FAILURE
                    &&
                    <div className={this.props.accountInvalid ? "input-ctn form-error" : "input-ctn"}>
                        <label>Select an account to debit</label>
                        <Select placeholder="Failed to load accounts..."
                            disabled="true"
                        />
                        <div className="input-ctn form-error"><a style={{ color: 'red', padding: '10px', cursor: 'pointer' }} onClick={this.loadDebitableAccounts}>
                            {this.props.accounts.debitable_accounts_data.response}, kindly click to again</a></div>
                    </div>}
            </Fragment>
            // <select>
            //     <option>ALAT Account - N56,902.56</option>
            //     <option>Current Account - N56,902.56</option>
            //     <option>Domiciliary Account - $30</option>
            // </select>
        );
    }

}

function mapStateToProps(state) {
    console.log(state);
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
        alert: state.alert,
        accounts: state.accounts,
        //fetching: state.data_reducer.isFetching
        // dataPlans: state.data_reducer.dataPlans,
        // dataInfo : state.data_reducer.dataToBuy,
        // fetching: state.data_reducer.isFetchingData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchDebitableAccounts: (token) => dispatch(actions.fetchDebitableAccounts(token))
        // fetchDataPlans: (token) => dispatch(actions.fetchDataPlans(token)),
        // setDataToBuyDetails: (dataToBuy, network) => dispatch(actions.setDataTransactionDetails(dataToBuy, network))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDebitableAccounts);
