import * as React from "react";
import OnboardingContainer from "../../onboarding/Container";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";
import {accountEnquiry, getBanks, getBeneficiaries} from "../../../redux/actions/transfer/cash-transfer.actions";
import {FETCH_BANK_PENDING, FETCH_BANK_SUCCESS, FETCH_BANK_FAILURE} from "../../../redux/constants/transfer.constants";
import {Fragment} from "react";
import InnerContainer from "../../../shared/templates/inner-container";
import TransferContainer from "../container";
import {connect} from "react-redux";
import Select from 'react-select';
import {Textbox} from "react-inputs-validation";
const options = [
];

class NewTransfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            hasBeneficiaries: false,
            selectedBank: null,
            accountNumber: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.fetchBanks();
    }


    fetchBanks(){
        const { dispatch } = this.props;
        dispatch(getBanks(this.state.user.token));
    }


    handleSubmit(e) {
        console.log("Form Submitted");
        e.preventDefault();
        this.setState({ submitted: true });
        const { selectedBank, accountNumber } = this.state;
        const { dispatch } = this.props;
        console.log(selectedBank);
        console.log(accountNumber);
        if (selectedBank && accountNumber) {
            this.setState({ submitted: true });
            let payload = {
                AccountNumber: accountNumber,
                BankCode: selectedBank.value
            };
            dispatch(accountEnquiry(this.state.user.token, payload));
            this.renderAccountDetail();
        }
        else{
            this.setState({ submitted: false });
        }
    }

    handleChange(selectedBank){
        this.setState({ selectedBank });
        console.log(`Option selected:`, selectedBank);
    }

    renderAccountDetail(){
        console.log("Wanna render account");
        console.log(this.props);
        console.log(this.state);
        let props = this.props;
        console.log(props.account_details);
    }

    // accountDetails

    renderDropdown(props){
        console.error(props);
        let banksStatus = props.bankList.banks; //FETCH_BANK_PENDING;
        console.log(banksStatus);
        // console.error(beneficiaryList);
        switch(banksStatus){
            case FETCH_BANK_PENDING:
                return (
                    <select disabled>
                        <option>Fetching Banks...</option>
                    </select>
                );
            case FETCH_BANK_SUCCESS:
                let banksList = props.bankList.banks_data.response;
                for(var bank in banksList){
                    options.push({value: banksList[bank].BankCode, label: banksList[bank].BankName});
                }
                const { selectedBank } = this.state;
                return(
                    <Select
                        value={selectedBank}
                        options={options}
                    />
                    /*<select>
                        {banksList.map(function(bank, code){
                            return(
                                <option key={code} value={bank.BankCode}>{bank.BankName}</option>
                            );
                        })}
                    </select>
                    */
                );
            case FETCH_BANK_FAILURE:
                this.showRetry();
                return(
                    <select disabled>
                        <option>Unable to load banks</option>
                    </select>
                );
        }
    }

    showRetry(){
        return <button onClick={this.fetchBanks.bind(this)}>Retry</button>;
    }

    render() {
        const {accountNumber, error} = this.state;
        // const {loggingIn, alert} = this.props;
        const { submitted } = this.props;
        let props = this.props;
        console.log("account number = "+accountNumber);
        console.log(props);
        // let banks = props.bankList;

        return (
            <Fragment>
                <InnerContainer>
                    <TransferContainer>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Send Money</p>
                            </div>

                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                            <li><a href="accounts.html" className="active">Bank Transfer</a></li>
                                            <li><a href="statement.html">Send To Contacts</a></li>
                                            <li><a href="#">Cardless Withdrawal</a></li>
                                            <li><a href="#">FX Transfer</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="max-600">


                                            <div className="al-card no-pad">
                                                <h4 className="m-b-10 center-text hd-underline">New Transfer</h4>

                                                <div className="transfer-ctn">
                                                    <form onSubmit={this.handleSubmit}>

                                                        <div className="input-ctn">
                                                            <label>Select a bank</label>
                                                            {this.renderDropdown(props)}
                                                        </div>

                                                        <div className="input-ctn">
                                                            <label>Account Number</label>
                                                            <Textbox
                                                                tabIndex="2"
                                                                id={'accountNumber'}
                                                                name="accountNumber"
                                                                type="number"
                                                                value={accountNumber}
                                                                onChange={(accountNumber, e) => {
                                                                    this.setState({ accountNumber });
                                                                }}
                                                                onBlur={(e) => {}}
                                                                validationOption={{
                                                                    name: 'accountNumber',
                                                                    check: true,
                                                                    required: true
                                                                }}
                                                            />
                                                            {/*<input type="tel"/>*/}
                                                        </div>


                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <center>
                                                                    <button type="submit" disabled={submitted} className="btn-alat m-t-10 m-b-20 text-center">{ submitted ? "Fetching account details..." : "Get Details" }</button>
                                                                    {/*<input type="submit" disabled={submitted} value="Get Details"*/}
                                                                           {/*className="btn-alat m-t-10 m-b-20 text-center"/>*/}
                                                                </center>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>


                                            <center>
                                                <a href="add-beneficiary.html" className="add-bene m-t-50">Go Back</a>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TransferContainer>
                </InnerContainer>
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    console.error(state);
    return {
        bankList: state.transfer_bankList,
        account_details: state.transfer_fetch_user_account
    };
}

export default connect(mapStateToProps)(NewTransfer);
