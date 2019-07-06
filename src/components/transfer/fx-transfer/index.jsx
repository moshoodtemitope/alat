import React, { Component, Fragment } from 'React';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import {Textbox} from "react-inputs-validation";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import { connect } from 'react-redux';
import {accountEnquiry, 
    getBanks, 
    clearTransferStore,
    getBeneficiaries,
    cashTransferData} from "../../../redux/actions/transfer/cash-transfer.actions";
import {FETCH_BANK_PENDING, 
    FETCH_BANK_SUCCESS, 
    GET_ACCOUNT_DETAILS_PENDING,
    GET_ACCOUNT_DETAILS_SUCCESS,
    GET_ACCOUNT_DETAILS_FAILURE,
    FETCH_BANK_FAILURE} from "../../../redux/constants/transfer.constants";

    const options = [
    ];
    let timerCount;

class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editTransfer = this.editTransfer.bind(this);
        this.keepRecipientData = this.keepRecipientData.bind(this);
        this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);
    }


    componentDidMount() {
        this.fetchBanks();
        this.getBeneficiaries();
    }


    fetchBanks(){
        const { dispatch } = this.props;
        dispatch(accountEnquiry(this.state.user.token, {}))
        dispatch(getBanks(this.state.user.token));
    }

    getBeneficiaries(){
        const { dispatch } = this.props;
        // dispatch(accountEnquiry(this.state.user.token, {}))
        dispatch(getBeneficiaries(this.state.user.token));
    }

    handleChange(selectedBank){
        this.setState({ selectedBank });
    }

    keepRecipientData(e, isSaveBeneficiary){
        e.preventDefault();
        const {dispatch, account_details, beneficiaries} = this.props;
        let accountsMatchingCurrency =[];
        this.setState({existingBeneficiaryError: false, 
            noMatchingCurrency:false, 
            recipientCurrencyText:this.props.account_details.account_detail_data.response.Currency});



        let    beneficiaryList = beneficiaries.beneficiaries_data.response.data,existingBeneficiary;
        if(isSaveBeneficiary ===true){
            existingBeneficiary = beneficiaryList.find((beneficiary)=>{
                return beneficiary.AccountNumber === this.state.accountNumber;
            })
            console.log('existing is', typeof existingBeneficiary);
            if(typeof existingBeneficiary==="undefined"){
                this.setState({existingBeneficiaryError: false});
                dispatch(cashTransferData({
                    AccountNumber: this.state.accountNumber,
                    AccountName: account_details.account_detail_data.response.AccountName,
                    BankName: this.state.selectedBank.label,
                    Currency: account_details.account_detail_data.response.Currency,
                    BankCode: this.state.selectedBank.value
                },false));
                this.props.history.push("/transfer/save-beneficiary");
            }else{
                this.setState({existingBeneficiaryError: true});
            }
            
        }else{
            let allAccounts = this.props.debitable_accounts.debitable_accounts_data.data,
                recipientCurrency =this.props.account_details.account_detail_data.response.Currency ;
                // recipientCurrency = "USD";

           
            console.log('currency is', this.state.recipientCurrencyText);

            accountsMatchingCurrency = allAccounts.filter(account=>account.Currency===recipientCurrency);
            
            console.log('all accounts',accountsMatchingCurrency );
            
            if(accountsMatchingCurrency.length>=1){
                dispatch(cashTransferData({
                    AccountNumber: this.state.accountNumber,
                    AccountName: account_details.account_detail_data.response.AccountName,
                    BankName: this.state.selectedBank.label,
                    Currency: account_details.account_detail_data.response.Currency,
                    BankCode: this.state.selectedBank.value
                },true));
            }else{
                dispatch(accountEnquiry(this.state.user.token, {}))
                this.setState({noMatchingCurrency:true});
            }
            // this.props.history.push("/transfer/provide-details");
        }
        
    }

    editTransfer(e){
        e.preventDefault();
        const { dispatch } = this.props;
        // this.forceUpdate();
        // this.props.account_details.fetchStatus = false;
        // console.log('state is', this.props);
        // this.setState({ selectedBank:'' });
        // this.props.dispatch(clearTransferStore());
        // this.setState({existingBeneficiaryError: false});
        dispatch(accountEnquiry(this.state.user.token, {}))
        // document.querySelector('#accountNumber').removeAttribute('disabled');
    }

    renderBankDropdown(props){
        // console.error(props);
        let banksStatus = props.bankList.banks; //FETCH_BANK_PENDING;
       
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
                    // console.log('Bank is', banksList[bank]);
                    if(banksList[bank].BankName.toLowerCase()==='wema bank'){
                         options.push({value: banksList[bank].BankCode, label: banksList[bank].BankName});
                    }
                   
                }
                const { selectedBank } = this.state;
                return(
                    <Select
                        options={options}
                        // isDisabled={this.state.submitButtonState}
                        isDisabled={props.account_details.fetchStatus}
                        // onInputChange={this.handleChange}
                        onChange={this.handleChange}
                    />
                    
                );
            case FETCH_BANK_FAILURE:
                return(
                    <div>
                        <select className="error-field" disabled>
                            <option>Unable to load banks</option>
                        </select>
                        <a className="cta-link to-right" onClick={this.fetchBanks}>Try again</a>
                    </div>
                );
        }
    }

    manageTimeout(){
        const { dispatch } = this.props;
        clearTimeout(timerCount);

        timerCount =   setTimeout(() => {
            dispatch(accountEnquiry(this.state.user.token, {}));   
            return null;      
        }, 3000)
    }
    renderAccountDetail(detailToRender){
        // this.setState({ submitted: false, submitButtonState: false });
        let props = this.props;
        const { dispatch } = this.props;
            if(detailToRender.Currency!=="NGN"){
                // this.setState({isCurrencyError: false});
                return(
                    <div className="input-ctn inputWrap">
                        <label>Account holder's name</label>
                        <Textbox
                            tabIndex="2"
                            id={'accountName'}
                            name="accountName"
                            disabled={true}
                            value={detailToRender.AccountName}
                        />
                    </div>
                );
            }else{
                // dispatch(accountEnquiry(this.state.user.token, {}));
                // this.setState({isCurrencyError: true})
                return(
                        <small className="error-msg block-msg text-center">
                          Fx Transfer not allowed for Naira account
                            {
                                // this.setState({isCurrencyError: true})((
                                this.manageTimeout()
                                // setTimeout(() => {
                                //         dispatch(accountEnquiry(this.state.user.token, {}));
                                //     }, 3000)
                            }
                        </small>    
                      
                    // </small>
                );
                
            }
    }
    handleSelectDebitableAccounts(account){

    }

    handleSubmit(e, props) {
        
        e.preventDefault();
        // console.log('select bank is,', this.state.selectedBank);
        // return false;
        const { selectedBank, accountNumber } = this.state;
        const { dispatch } = this.props;
        
        this.setState({isCurrencyError: false});
        if (selectedBank && accountNumber) {
            this.setState({ submitted: true, submitButtonState: true, inputState: true });
            let payload = {
                AccountNumber: accountNumber.trim(),
                BankCode: selectedBank.value||""
            };
            dispatch(accountEnquiry(this.state.user.token, payload));
            // this.handleDetailsStatus();
            let accountFetchStatus = this.props.account_details;
           

            let props = this.props,
            accountInfo = props.account_details;
        
            {accountInfo.account_detail===GET_ACCOUNT_DETAILS_SUCCESS &&
                this.setState({ submitted: false, submitButtonState: false })
            }

            {accountInfo.account_detail===GET_ACCOUNT_DETAILS_FAILURE &&
                this.setState({ submitted: false, submitButtonState: false, inputState: false });
            }

            console.log('account details will be', accountInfo);
            
            
        }
        else{
            this.setState({ submitted: false, submitButtonState: false });
        }
    }


    render(){
        const {accountNumber} = this.state;

        let props = this.props,
            accountInfo = props.account_details;
        return(
            <div className="col-sm-12">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="max-600">
                            <div className="al-card no-pad">
                                <h4 className="m-b-10 center-text hd-underline">New FX Transfer</h4>
                                
                                <div className="transfer-ctn">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="input-ctn inputWrap">
                                            <label>Account number</label>
                                            <Textbox
                                                tabIndex="2"
                                                id={'accountNumber'}
                                                name="accountNumber"
                                                type="text"
                                                autoComplete ="off"
                                                value={accountNumber}
                                                maxLength="11"
                                                placeholder= "Enter recipient account number"
                                                validationOption ={{
                                                    "required":false
                                                }}
                                                onBlur={(e) => {}}
                                                onChange= {(accountNumber, e)=>{
                                                    this.setState({accountInputError:'', accountNumber});
                                                }}
                                            />           
                                        
                                            {accountInfo.account_detail===GET_ACCOUNT_DETAILS_FAILURE &&
                                                <small className="error-msg">{accountInfo.account_detail_data.error}</small>
                                            }
                                        </div>
                                        <div className="input-ctn">
                                            <label>Select a bank</label>
                                            {this.renderBankDropdown(props)}
                                            
                                        </div>

                                        {accountInfo.account_detail===GET_ACCOUNT_DETAILS_SUCCESS &&
                                            this.renderAccountDetail(accountInfo.account_detail_data.response)
                                        }

                                        

                                        {accountInfo.account_detail!==GET_ACCOUNT_DETAILS_SUCCESS &&
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                        <button type="submit" disabled={accountInfo.fetchStatus} className="btn-alat m-t-10 m-b-20 text-center">{ accountInfo.fetchStatus ? "Fetching account details..." : "Get Details" }</button>
                                                        {/*<input type="submit" disabled={submitted} value="Get Details"*/}
                                                                {/*className="btn-alat m-t-10 m-b-20 text-center"/>*/}
                                                    </center>
                                                </div>
                                            </div>
                                        }
                                        {this.state.noMatchingCurrency &&
                                                <small className="error-msg text-center block-msg">None of your accounts match your recipient currency({this.state.recipientCurrencyText})</small>
                                        }
                                        <div className="inputctn-wrap hide">
                                            <SelectDebitableAccounts
                                                value={this.state.accountNumber}
                                                // currency={currencySelected}
                                                requestType = "forBankTransfer"
                                                accountInvalid={this.state.isAccountInvalid}
                                                onChange={this.handleSelectDebitableAccounts} />
                                        </div>
                                    </form>
                                    {accountInfo.account_detail===GET_ACCOUNT_DETAILS_SUCCESS &&
                                        <div className="proceed-ctas">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <center>
                                                        <button type="submit" onClick={(e)=>this.keepRecipientData(e, true)} className="btn-alat light-btn m-t-10 m-b-20 text-center">Save</button>
                                                    </center>
                                                </div>
                                                <div className="col-sm-6">
                                                    <center>
                                                        <button type="submit" onClick={(e)=>this.keepRecipientData(e, false)} className="btn-alat m-t-10 m-b-20 text-center">Send</button>
                                                    </center>
                                                </div>
                                                <div className="col-sm-12">
                                                    <center> <a onClick={this.editTransfer} className="edit-cta">Edit details</a></center>
                                                    
                                                </div>
                                            </div>
                                            
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        debitable_accounts: state.accounts,
        bankList: state.transferReducerPile.transfer_bankList,
        beneficiaries: state.transferReducerPile.transfer_beneficiaries,
        account_details: state.transferReducerPile.transfer_fetch_user_account,
    }
}

export default connect(mapStateToProps)(Index);