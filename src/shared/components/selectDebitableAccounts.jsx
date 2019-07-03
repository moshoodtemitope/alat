import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import * as actions from '../../redux/actions/airtime-bill/airtime.action';
import { airtimeConstants } from '../../redux/constants/airtime/airtime.constants';
import { formatAmount } from '../../shared/utils';

class SelectDebitableAccounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            debitableAccounts: [],
            selectedAccount: {},
            isAccountsLoaded : false
        };
    }

    componentDidMount() {
        if(this.props.accounts.debitable_accounts ==
                airtimeConstants.GET_DEBTABLE_ACCOUNTS_PENDING){}
        else this.loadDebitableAccounts();
    }

    sortAccountsForSelect = () => {
        var arrayToDisplay = [];
        if (this.props.accounts.debitable_accounts_data.data.length >= 1) {
            this.props.accounts.debitable_accounts_data.data.map((data => arrayToDisplay.push({ value: data.AccountNumber, label: data.AccountDescription + " - N" + formatAmount(data.AvailableBalance) })));
        } else {
            arrayToDisplay = [{ value: '', displayValue: 'No Debitable Account Available' }];
        }
        //console.log(arrayToDisplay)

        // const _debitableAccounts = {
        //     ...this.state
        // }
        // _debitableAccounts.debitableAccounts = arrayToDisplay;
        
        this.setState({ debitableAccounts: arrayToDisplay,
                        isAccountsLoaded : true});

    }

    loadDebitableAccounts = () => {
        if (this.props.accounts)
            if (this.props.accounts.debitable_accounts ==
                airtimeConstants.GET_DEBTABLE_ACCOUNTS_SUCCESS) {
                this.setState({isAccountsLoaded : true});
            }
            else if(this.props.accounts.debitable_accounts ==
                airtimeConstants.GET_DEBTABLE_ACCOUNTS_PENDING) {
               // 
            }
            else{
                this.props.fetchDebitableAccounts({token:this.state.user.token, requestType: this.props.requestType});
            }
    }

    handleSelectAccount = (e) => {
       // console.log(e);
        this.props.onChange(e.value, e);
        this.setState({ selectedAccount: e.value })
    }

    render() {
        if (this.props.accounts.debitable_accounts_data)
            if (this.props.accounts.debitable_accounts_data.data && !this.state.isAccountsLoaded )
                this.sortAccountsForSelect();
        return (
            <Fragment>
                {this.props.accounts &&
                    this.props.accounts.debitable_accounts ==
                    airtimeConstants.GET_DEBTABLE_ACCOUNTS_SUCCESS
                    &&
                    <div className={this.props.accountInvalid ? "input-ctn form-error" : "input-ctn"}>
                        <label>{this.props.labelText}</label>
                        <Select placeholder="Select Account"
                            onChange={this.handleSelectAccount}
                            options={this.state.debitableAccounts}
                            value={this.props.value}
                        />
                        {this.props.accountInvalid &&
                            <div className={this.props.accountInvalid ? "input-ctn form-error" : "input-ctn"}>an account is required</div>}
                    </div>
                }

                {this.props.accounts &&
                    this.props.accounts.debitable_accounts ==
                    airtimeConstants.GET_DEBTABLE_ACCOUNTS_PENDING
                    &&
                    <div className={this.props.accountInvalid ? "input-ctn form-error" : "input-ctn"}>
                        <label>{this.props.labelText}</label>
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
                        <label>{this.props.labelText}</label>
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
    //console.log(state);
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
        fetchDebitableAccounts: (params) => dispatch(actions.fetchDebitableAccounts(params.token, params.requestType))
        // fetchDataPlans: (token) => dispatch(actions.fetchDataPlans(token)),
        // setDataToBuyDetails: (dataToBuy, network) => dispatch(actions.setDataTransactionDetails(dataToBuy, network))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectDebitableAccounts);
