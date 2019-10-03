import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";
import {accountEnquiry,
        getBanks,
        getBeneficiaries,
        deleteTransferBeneficiary,
        cashTransferData,
        clearTransferStore} from "../../../redux/actions/transfer/cash-transfer.actions";
import {FETCH_BANK_PENDING,
        FETCH_BANK_SUCCESS,
        FETCH_BANK_FAILURE,
        GET_ACCOUNT_DETAILS_PENDING,
        GET_ACCOUNT_DETAILS_SUCCESS,
        GET_ACCOUNT_DETAILS_FAILURE,
        FETCH_TRANSFER_BENEFICIARY_SUCCESS,
        FETCH_TRANSFER_BENEFICIARY_PENDING,
        FETCH_TRANSFER_BENEFICIARY_FAILURE,
        TRANSFER__BANK_DETAILS,
        TRANSFER__BANK_DETAILS_FAILURE,
        TRANSFER__BANK_DETAILS_SUCCESS,
        DELETE_TRANSFER_BENEFICIARY_SUCCESS,
        DELETE_TRANSFER_BENEFICIARY_PENDING,
        DELETE_TRANSFER_BENEFICIARY_FAILURE} from "../../../redux/constants/transfer.constants";
import {Fragment} from "react";
import "./../transfer.scss";
import InnerContainer from "../../../shared/templates/inner-container";
import TransferContainer from "../container";
import {connect} from "react-redux";
import Select from 'react-select';
import Modal from 'react-responsive-modal';
import {Textbox} from "react-inputs-validation";
let options = [
];

class NewTransfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            hasBeneficiaries: false,
            selectedBank: null,
            accountNumber: "",
            accountInputError: '',
            submitted: false,
            deletingBeneficiary: false,
            inputState: false,
            showAccountDetail: '',
            detailVerificacationStatus: '',
            submitButtonState: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.keepRecipientData = this.keepRecipientData.bind(this);
        this.fetchBanks = this.fetchBanks.bind(this);
        this.renderBeneficiaries= this.renderBeneficiaries.bind(this);
        this.getBeneficiaries = this.getBeneficiaries.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.confirmDeleteTransferBeneficiary =  this.confirmDeleteTransferBeneficiary.bind(this);
        this.showAllBeneficiaries = this.showAllBeneficiaries.bind(this);
        this.searchBeneficiaries = this.searchBeneficiaries.bind(this);
        this.goToSaveBeneficiary = this.goToSaveBeneficiary.bind(this);
        this.editTransfer = this.editTransfer.bind(this);
        this.handleDetailsStatus = this.handleDetailsStatus.bind(this);
        this.proceedWithSelectBeneficary = this.proceedWithSelectBeneficary.bind(this);
    }

    componentDidMount() {
        this.fetchBanks();
        this.getBeneficiaries();
        // this.handleDetailsStatus();
    }

    getBeneficiaries(){
        const { dispatch } = this.props;
        // dispatch(accountEnquiry(this.state.user.token, {}))
        dispatch(getBeneficiaries(this.state.user.token));
    }

    goToSaveBeneficiary(e){
        e.preventDefault();
        this.props.history.push("/transfer/provide-details");
    }

    editTransfer(e){
        e.preventDefault();
        const { dispatch } = this.props;
        // this.forceUpdate();
        // this.props.account_details.fetchStatus = false;
        // console.log('state is', this.props);
        // this.setState({ selectedBank:'' });
        // this.props.dispatch(clearTransferStore());
        this.setState({existingBeneficiaryError: false});
        dispatch(accountEnquiry(this.state.user.token, {}))
        // document.querySelector('#accountNumber').removeAttribute('disabled');
    }

    handleDetailsStatus(e){
        e.preventDefault();
        // if(this.props.account_details.account_detail===GET_ACCOUNT_DETAILS_SUCCESS){
        //     this.setState({detailDisabledState: true});
        //     console.log('details status is', this.state.detailDisabledState);
        // }
        // if(this.props.account_details.account_detail===GET_ACCOUNT_DETAILS_PENDING){
        //     this.setState({detailDisabledState: true});
        //     console.log('pending  status is', this.state.detailDisabledState);
        // }
        // if(this.props.account_details.account_detail===GET_ACCOUNT_DETAILS_FAILURE){
        //     this.setState({detailDisabledState: false});
        // }

        this.props.dispatch(clearTransferStore());

    }

    toggleModal=(beneficiary, key, e)=>{
        this.setState({existingBeneficiaryError: false});
        if(e){
            e.stopPropagation();
            this.setState({ beneficiaryToDelete : beneficiary, elemToDelete: key});
        }

        if(this.state.openModal){
           this.setState( {openModal : false  })
        }else {
            this.setState ({openModal : true  });
        }
    }

    beneficiaryToshow(beneficiary){
        return (beneficiary.Currency==="NGN");

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
                    <div className="loading-content">
                        Fetching Beneficiaries...
                    </div>
                );
            case FETCH_TRANSFER_BENEFICIARY_SUCCESS:
                let beneficiaries = props.beneficiaries.beneficiaries_data.response.data,
                filteredBeneficiaries = beneficiaries.filter(this.beneficiaryToshow);
                    // this.setState({beneficairiesList: beneficiaries});

                return(
                    <div>
                        {(filteredBeneficiaries.length>1) &&
                            <div className="col-sm-12 col-md-10 offset-md-1 search-wrap hide">
                                <div className="search-beneficiary">
                                    <input type="text" onChange={this.searchBeneficiaries} placeholder="Search beneficiary"/>
                                </div>
                            </div>

                        }
                        {filteredBeneficiaries.map((ben, key) => {
                            return (

                                <Fragment>
                                    <div className={(key>=1)?"col-sm-12 col-md-10 offset-md-1 each-beneficiary hide": "col-sm-12 col-md-10 each-beneficiary offset-md-1"} key={key} id={"beneficiary-"+key}>
                                        <div className="al-card beneficiary-card transfer-beneficiary" onClick={()=>this.proceedWithSelectBeneficary(ben, false)}>
                                            <div className="clearfix">
                                                <div className="bankicon-img">
                                                    {/* <img src="img/airtel.png" srcset="img/airtel@2x.png 2x"/> */}
                                                    <i className="demo-icon icon-bank-building" aria-hidden="true"></i>
                                                </div>
                                                <div className="all-info">
                                                    <p className="summary-info"> <span className="nickname-text">{ben.Nickname}</span>  <span> <a onClick={(e)=>this.toggleModal(ben,'beneficiary-'+key, e)} ><i className="fa fa-trash-o" aria-hidden="true"></i></a>  </span> </p>
                                                    <p className="account-info">{ben.AccountNumber}
                                                        <span className="bank-name">{ben.BankName}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </Fragment>
                            )
                        })
                        }
                        {(filteredBeneficiaries.length>1) &&
                            <div className="see-more-cta"><a onClick={this.showAllBeneficiaries} >See all beneficiaries</a> </div>
                        }
                    </div>

                );
            case FETCH_TRANSFER_BENEFICIARY_FAILURE:
                // this.fetchBeneficiariesRetry();
                return(
                    <div className="info-label error">Unable to load beneficiaries</div>
                );
        }
    }

    searchBeneficiaries(e){

        let searchText = e.target.value;
        // if(searchText.length>=1){
            document.querySelectorAll('.each-beneficiary').forEach((eachBeneficiary)=>{

                if(eachBeneficiary.querySelector('.nickname-text').textContent.toLowerCase().indexOf(searchText.toLowerCase()) > -1){

                    if(eachBeneficiary.classList.contains('hide')){
                        eachBeneficiary.classList.remove('hide');
                    }
                }
                else{
                    eachBeneficiary.classList.add('hide');

                }
                // if(eachBeneficiary.classList.contains('hide')){
                //     eachBeneficiary.classList.remove('hide');
                // }
            });
        // }
    }

    showAllBeneficiaries(e){
        e.preventDefault()
        document.querySelectorAll('.each-beneficiary').forEach((eachBeneficiary)=>{
            if(eachBeneficiary.classList.contains('hide')){
                eachBeneficiary.classList.remove('hide');
            }
        });
        document.querySelector('.see-more-cta').classList.add('hide');
        document.querySelector('.search-wrap').classList.remove('hide');
    }

    endBeneficiaryDelete(){
        // this.toggleModal();
        // if(this.state.beneficiaryToDelete){

            let props = this.props;
            const {dispatch} = this.props;
            if(this.state.deletingBeneficiary ===true && props.beneficiary_delete_state.beneficiary_delete_state === DELETE_TRANSFER_BENEFICIARY_SUCCESS){
            // let benDeleteStatus = props.beneficiary_delete_state;
            // let beneficiaries = props.beneficiaries.beneficiaries_data.response.data;
            // let deleteIndex = beneficiaries.findIndex(item=>{item.AccountNumber === this.state.beneficiaryToDelete.AccountNumber});

            //     beneficiaries.splice(deleteIndex,1);
            //     console.error('remainning ones', beneficiaries);

                //
                // console.log('to remove is', this.state.elemToDelete);
                // if(document.getElementById(''+this.state.elemToDelete)){
                //     document.getElementById(''+this.state.elemToDelete).remove();
                //     this.toggleModal();
                // }


                // dispatch(getBeneficiaries(this.state.user.token));
                // this.props.dispatch(clearTransferStore());
                this.getBeneficiaries();
                this.toggleModal();
                this.setState({deletingBeneficiary:false});
            }

    }


    confirmDeleteTransferBeneficiary(){
        const { dispatch } = this.props;

        let beneficiary = this.state.beneficiaryToDelete;
            beneficiary.TransactionPin = '0000';
            this.setState({beneficiaryToDelete: beneficiary, deletingBeneficiary: true});

            dispatch(deleteTransferBeneficiary((this.state.user.token), this.state.beneficiaryToDelete));
    }



    fetchBanks(){
        const { dispatch } = this.props;
        dispatch(accountEnquiry(this.state.user.token, {}))
        dispatch(getBanks(this.state.user.token));
    }

    keepRecipientData(e, isSaveBeneficiary){
        e.preventDefault();
        const {dispatch, account_details, beneficiaries} = this.props;
        this.setState({existingBeneficiaryError: false});

        let    beneficiaryList = beneficiaries.beneficiaries_data.response.data,existingBeneficiary;
        if(isSaveBeneficiary ===true){
            existingBeneficiary = beneficiaryList.find((beneficiary)=>{
                return beneficiary.AccountNumber === this.state.accountNumber;
            })
            // console.log('existing is', typeof existingBeneficiary);
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
            dispatch(cashTransferData({
                AccountNumber: this.state.accountNumber,
                AccountName: account_details.account_detail_data.response.AccountName,
                BankName: this.state.selectedBank.label,
                Currency: account_details.account_detail_data.response.Currency,
                BankCode: this.state.selectedBank.value
            },false, null));
            this.props.history.push("/transfer/provide-details");
        }

    }

    proceedWithSelectBeneficary(beneficiary){
        
        const {dispatch} = this.props;
        // this.setState({})
        dispatch(cashTransferData({
            AccountNumber: beneficiary.AccountNumber,
            AccountName: beneficiary.AccountName,
            BankName: beneficiary.BankName,
            BankCode: beneficiary.BankCode,
            Currency: beneficiary.Currency
        }, false, this.state.user.token));

    }

    handleSubmit(e, props) {

        e.preventDefault();
        // console.log('select bank is,', this.state.selectedBank);
        // return false;
        const { selectedBank, accountNumber } = this.state;
        const { dispatch } = this.props;

        if (selectedBank && accountNumber) {
            this.setState({ submitted: true, submitButtonState: true, inputState: true });
            let payload = {
                AccountNumber: accountNumber,
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

            // console.log('account details will be', accountInfo);


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
                <label>Account holder's name</label>
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
                // for(var bank in banksList){
                //     options.push({value: banksList[bank].BankCode, label: banksList[bank].BankName});
                // }
                banksList.map(eachBank=>{
                    options.push({value: eachBank.BankCode, label: eachBank.BankName});
                })
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


    render() {
        const {accountNumber,
                error,
                accountInputError,
                submitButtonState,
                detailVerificacationStatus,
                existingBeneficiaryError} = this.state;
        // const {loggingIn, alert} = this.props;
        const { submitted, inputState } = this.state;
        let props = this.props,
            beneficiaryListStatus = props.beneficiaries,
            accountInfo = props.account_details,
            benDeleteStatus = props.beneficiary_delete_state;



            // {accountInfo.account_detail===GET_ACCOUNT_DETAILS_SUCCESS &&
            //     this.setState({ submitted: false, submitButtonState: false })
            // }
        // let banks = props.bankList;

        return (
            <Fragment>

                        {/* here */}

                            {/* to here */}
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
                                                                type="text"
                                                                autoComplete ="off"

                                                                value={accountNumber}
                                                                disabled={accountInfo.fetchStatus}
                                                                maxLength="11"
                                                                placeholder= "Enter recipient account number"
                                                                validationOption ={{
                                                                    "required":false
                                                                }}
                                                                onBlur={(e) => {}}
                                                                onChange= {(accountNumber, e)=>{
                                                                    this.setState({accountInputError:'', accountNumber, submitButtonState: false});
                                                                    // if(accountNumber.length===0){
                                                                    //     this.setState({accountInputError:'Account number is required', submitButtonState: true});
                                                                    //     document.querySelector('.inputWrap').classList.add('form-error');
                                                                    // }
                                                                    // else if(accountNumber.length < 10){
                                                                    //     this.setState({accountInputError:'A valid account number is required', submitButtonState: true});
                                                                    //     document.querySelector('.inputWrap').classList.add('form-error');
                                                                    // }
                                                                    // else{
                                                                    //     document.querySelector('.inputWrap').classList.remove('form-error');
                                                                    // }
                                                                }}
                                                            />
                                                            {/* {(accountInputError !=='' && accountInfo.account_detail!==GET_ACCOUNT_DETAILS_FAILURE) &&
                                                                <small className="error-msg">{accountInputError}</small>
                                                            } */}
                                                            {accountInfo.account_detail===GET_ACCOUNT_DETAILS_FAILURE &&
                                                                <small className="error-msg">{accountInfo.account_detail_data.error}</small>
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
                                                                    <button type="submit" disabled={accountInfo.fetchStatus} className="btn-alat m-t-10 m-b-20 text-center">{ accountInfo.fetchStatus ? "Fetching account details..." : "Get Details" }</button>
                                                                    {/*<input type="submit" disabled={submitted} value="Get Details"*/}
                                                                           {/*className="btn-alat m-t-10 m-b-20 text-center"/>*/}
                                                                </center>
                                                            </div>
                                                        </div>
                                                    }


                                                    </form>
                                                    {accountInfo.account_detail===GET_ACCOUNT_DETAILS_SUCCESS &&
                                                        <div className="proceed-ctas">
                                                            <div className="row">
                                                                <div className="col-sm-6">
                                                                    <center>
                                                                        <button type="submit" onClick={(e)=>this.keepRecipientData(e, true)}  className="btn-alat light-btn m-t-10 m-b-20 text-center">Save</button>
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
                                                    {existingBeneficiaryError ===true &&
                                                        <div className="info-label error">This beneficiary already exists</div>
                                                    }
                                                </div>
                                            </div>

                                            {this.renderBeneficiaries()}
                                            {/* {benDeleteStatus.beneficiary_delete_state ===DELETE_TRANSFER_BENEFICIARY_SUCCESS &&
                                                this.endBeneficiaryDelete()
                                            } */}
                                            {this.endBeneficiaryDelete()}
                                            <Modal open={this.state.openModal} onClose={this.toggleModal} center>
                                                <div className="div-modal">

                                                    {(this.state.openModal || benDeleteStatus.beneficiary_delete_state !==DELETE_TRANSFER_BENEFICIARY_SUCCESS) &&
                                                        <div>
                                                            <h3 className="modal-heading">Warning</h3>
                                                            <div className="modal-text">Are you sure you want to delete this beneficiary?</div>
                                                            <div className="btn-opt">
                                                                <button onClick={this.toggleModal} className="border-btn" disabled={benDeleteStatus.beneficiaryDeleteStatus}>Back</button>
                                                                <button onClick={this.confirmDeleteTransferBeneficiary}
                                                                    className="btn-alat" disabled={benDeleteStatus.beneficiaryDeleteStatus}>{ (benDeleteStatus.beneficiaryDeleteStatus===false)|| (!benDeleteStatus.beneficiaryDeleteStatus) ? "Proceed" : "Deleting..." }</button>
                                                            </div>
                                                        </div>

                                                    }

                                                    {/* {benDeleteStatus.beneficiary_delete_state ===DELETE_TRANSFER_BENEFICIARY_SUCCESS &&
                                                        <div className="modal-text">
                                                            Beneficiary successfully deleted
                                                        </div>
                                                    } */}

                                                </div>
                                            </Modal>
                                            {beneficiaryListStatus.beneficiaries===FETCH_TRANSFER_BENEFICIARY_FAILURE &&
                                                <center><a className="cta-link" onClick={this.getBeneficiaries}>Try again</a></center>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* here down */}
                            </div>
            </Fragment>
        );
    }
}


function mapStateToProps(state){
    // console.error(state);
    return {
        bankList: state.transferReducerPile.transfer_bankList,
        beneficiaries: state.transferReducerPile.transfer_beneficiaries,
        account_details: state.transferReducerPile.transfer_fetch_user_account,
        beneficiary_delete_state: state.transferReducerPile.delete_transfer_beneficiaryState
    };
}

export default connect(mapStateToProps)(NewTransfer);
