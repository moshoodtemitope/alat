import * as React from "react";
import OnboardingContainer from "../../onboarding/Container";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";
import {accountEnquiry, getBanks, getBeneficiaries} from "../../../redux/actions/transfer/cash-transfer.actions";
import {FETCH_BANK_PENDING, 
        FETCH_BANK_SUCCESS, 
        FETCH_BANK_FAILURE, 
        GET_ACCOUNT_DETAILS_PENDING,
        GET_ACCOUNT_DETAILS_SUCCESS,
        GET_ACCOUNT_DETAILS_FAILURE,
        FETCH_TRANSFER_BENEFICIARY_SUCCESS, 
        FETCH_TRANSFER_BENEFICIARY_PENDING,
        FETCH_TRANSFER_BENEFICIARY_FAILURE} from "../../../redux/constants/transfer.constants";
import {Fragment} from "react";
import "./../transfer.scss";
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
            accountNumber: null,
            accountInputError: '',
            submitted: false,
            inputState: false,
            showAccountDetail: '',
            detailVerificacationStatus: '',
            submitButtonState: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.continueTransfer = this.continueTransfer.bind(this);
    }

    componentDidMount() {
        this.fetchBanks();
        this.getBeneficiaries();
    }



    getBeneficiaries(){
        const { dispatch } = this.props;
        dispatch(getBeneficiaries(this.state.user.token));
    }


    renderBeneficiaries(){
        
        let props = this.props;
        // console.info('props is:', this.props);
        let beneficiaryListStatus = props.beneficiaries.beneficiaries;
        // console.error('List of beneficiaries',beneficiaryListStatus);
        // return false;
        switch(beneficiaryListStatus){
            case FETCH_TRANSFER_BENEFICIARY_PENDING:
                return (
                    <div>
                        Fetching Beneficiaries...
                    </div>
                );
            case FETCH_TRANSFER_BENEFICIARY_SUCCESS:
                let beneficiaries = props.beneficiaries.beneficiaries_data.response.data;
                
                

                return(
                    beneficiaries.map((ben, key) => {
                        return (
                            <div className="col-sm-12 col-md-10 offset-md-1" key={key}>
                                <div className="al-card beneficiary-card">
                                    <div className="clearfix">
                                        <div className="network-img">
                                            {/* <img src="img/airtel.png" srcset="img/airtel@2x.png 2x"/> */}
                                            <i className="demo-icon icon-bank-building" aria-hidden="true"></i>
                                        </div>
                                        <div className="all-info">
                                            <p className="nickname">{ben.Nickname}</p>
                                            <p className="account-info">{ben.AccountNumber}
                                                <span className="bank-name">{ben.BankName}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    // <Select
                    //     value={selectedOption}
                    //     onChange={this.handleChange}
                    //     options={options}
                    // />

                    // <select>
                    //     {beneficiaries.map(function(beneficiary, accountNumber){
                    //         return(
                    //             <option key={accountNumber} value={beneficiary.AccountNumber}>{beneficiary.Nickname}</option>
                    //         );
                    //     })}
                    // </select>
                );
            case FETCH_TRANSFER_BENEFICIARY_FAILURE:
                this.showRetry();
                return(
                    <select disabled>
                        <option>Unable to load beneficiaries</option>
                    </select>
                );
        }
    }

    fetchBanks(){
        const { dispatch } = this.props;
        dispatch(getBanks(this.state.user.token));
    }

    continueTransfer(e){
        e.preventDefault();

    }

    handleSubmit(e) {
        
        e.preventDefault();
        
        const { selectedBank, accountNumber } = this.state;
        const { dispatch } = this.props;
       
        if (selectedBank && accountNumber) {
            this.setState({ submitted: true, submitButtonState: true, inputState: true });
            let payload = {
                AccountNumber: accountNumber,
                BankCode: selectedBank.value
            };
            dispatch(accountEnquiry(this.state.user.token, payload));
            let accountFetchStatus = this.props.account_details;
            console.log('Status is', accountFetchStatus);

            let props = this.props,
            accountInfo = props.account_details;
        
            {accountInfo.account_detail===GET_ACCOUNT_DETAILS_SUCCESS &&
                this.setState({ submitted: false, submitButtonState: false })
            }
            
            
            
        }
        else{
            this.setState({ submitted: false, submitButtonState: false });
        }
    }

    renderAccountDetail(detailToRender){
        // this.setState({ submitted: false, submitButtonState: false });
        let props = this.props;
        return(
            <div className="input-ctn inputWrap">
                <label>Account name</label>
                <Textbox
                    tabIndex="2"
                    id={'accountName'}
                    name="accountName"
                    disabled="true"
                    value={detailToRender.AccountName}
                />
            </div>
        );
    }

    handleChange(selectedBank){
        this.setState({ selectedBank });
        
    }

    // accountDetails

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
                    options.push({value: banksList[bank].BankCode, label: banksList[bank].BankName});
                }
                const { selectedBank } = this.state;
                return(
                    <Select
                        options={options}
                        isDisabled={this.state.submitButtonState}
                        onChange={this.handleChange}
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
        const {accountNumber, 
                error, 
                accountInputError, 
                submitButtonState,
                detailVerificacationStatus} = this.state;
        // const {loggingIn, alert} = this.props;
        const { submitted, inputState } = this.state;
        let props = this.props,
            accountInfo = props.account_details;
        
            // {accountInfo.account_detail===GET_ACCOUNT_DETAILS_SUCCESS &&
            //     this.setState({ submitted: false, submitButtonState: false })
            // }
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
                                                            {this.renderBankDropdown(props)}
                                                        </div>

                                                        <div className="input-ctn inputWrap">
                                                            <label>Account number</label>
                                                            <Textbox
                                                                tabIndex="2"
                                                                id={'accountNumber'}
                                                                name="accountNumber"
                                                                type="number"
                                                                value={accountNumber}
                                                                disabled={inputState}
                                                                maxLength="11"
                                                                placeholder= "Enter recipient account number"
                                                                
                                                                onBlur={(e) => {}}
                                                                onChange= {(accountNumber, e)=>{
                                                                    this.setState({accountInputError:'', accountNumber, submitButtonState: false});
                                                                    if(accountNumber.length===0){
                                                                        this.setState({accountInputError:'Account number is required', submitButtonState: true});
                                                                        document.querySelector('.inputWrap').classList.add('form-error');
                                                                    }
                                                                    else if(accountNumber.length < 10){
                                                                        this.setState({accountInputError:'A valid account number is required', submitButtonState: true});
                                                                        document.querySelector('.inputWrap').classList.add('form-error');
                                                                    }
                                                                    else{
                                                                        document.querySelector('.inputWrap').classList.remove('form-error');
                                                                    }
                                                                }}
                                                            />
                                                            {accountInputError !=='' &&
                                                                <small className="error-msg">{accountInputError}</small>
                                                            }
                                                            {/*<input type="tel"/>*/}
                                                            
                                                        </div>
                                                        
                                                        
                                                        
                                                        {accountInfo.account_detail===GET_ACCOUNT_DETAILS_SUCCESS &&
                                                            this.renderAccountDetail(accountInfo.account_detail_data.response)
                                                        }

                                                    {accountInfo.account_detail!==GET_ACCOUNT_DETAILS_SUCCESS &&
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <center>
                                                                    <button type="submit" disabled={submitButtonState} className="btn-alat m-t-10 m-b-20 text-center">{ submitted ? "Fetching account details..." : "Get Details" }</button>
                                                                    {/*<input type="submit" disabled={submitted} value="Get Details"*/}
                                                                           {/*className="btn-alat m-t-10 m-b-20 text-center"/>*/}
                                                                </center>
                                                            </div>
                                                        </div>
                                                    }
                                                        
                                                        
                                                    </form>
                                                    {accountInfo.account_detail===GET_ACCOUNT_DETAILS_SUCCESS &&
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <center>
                                                                    <button type="submit" onClick={this.continueTransfer} className="btn-alat m-t-10 m-b-20 text-center">Continue</button>
                                                                </center>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>


                                            {/* <center>
                                                <a href="add-beneficiary.html" className="add-bene m-t-50">Go Back</a>
                                            </center> */}

                                            {this.renderBeneficiaries()}
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
    // console.error(state);
    return {
        bankList: state.transfer_bankList,
        beneficiaries: state.transfer_beneficiaries,
        account_details: state.transfer_fetch_user_account
    };
}

export default connect(mapStateToProps)(NewTransfer);
