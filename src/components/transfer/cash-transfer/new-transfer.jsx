import * as React from "react";
import {Router} from "react-router";
// import * as utils from "../../shared/utils";
import {accountEnquiry, 
        getBanks, 
        getBeneficiaries, 
        deleteTransferBeneficiary,
        cashTransferData} from "../../../redux/actions/transfer/cash-transfer.actions";
import {FETCH_BANK_PENDING, 
        FETCH_BANK_SUCCESS, 
        FETCH_BANK_FAILURE, 
        GET_ACCOUNT_DETAILS_PENDING,
        GET_ACCOUNT_DETAILS_SUCCESS,
        GET_ACCOUNT_DETAILS_FAILURE,
        FETCH_TRANSFER_BENEFICIARY_SUCCESS, 
        FETCH_TRANSFER_BENEFICIARY_PENDING,
        FETCH_TRANSFER_BENEFICIARY_FAILURE,
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
        this.fetchBanks = this.fetchBanks.bind(this);
        this.renderBeneficiaries= this.renderBeneficiaries.bind(this);
        this.getBeneficiaries = this.getBeneficiaries.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.confirmDeleteTransferBeneficiary =  this.confirmDeleteTransferBeneficiary.bind(this);
        this.showAllBeneficiaries = this.showAllBeneficiaries.bind(this);
        this.searchBeneficiaries = this.searchBeneficiaries.bind(this);
    }

    componentDidMount() {
        this.fetchBanks();
        this.getBeneficiaries();
    }



    getBeneficiaries(){
        const { dispatch } = this.props;
        dispatch(getBeneficiaries(this.state.user.token));
    }


    toggleModal=(beneficiary, key)=>{
        
        this.setState({ beneficiaryToDelete : beneficiary, elemToDelete: key});
        
        if(this.state.openModal){
           this.setState( {openModal : false  })
        }else {
            this.setState ({openModal : true  });
        }
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
                let beneficiaries = props.beneficiaries.beneficiaries_data.response.data;
                    // this.setState({beneficairiesList: beneficiaries});
                
                return(
                    <div>
                        {(beneficiaries.length>1) && 
                            <div className="col-sm-12 col-md-10 offset-md-1 search-wrap hide">
                                <div className="search-beneficiary">
                                    <input type="text" onChange={this.searchBeneficiaries} placeholder="Search beneficiary"/>
                                </div>
                            </div>
                            
                        }
                        {beneficiaries.map((ben, key) => {
                            return (
                                
                                <Fragment>
                                    <div className={(key>=1)?"col-sm-12 col-md-10 offset-md-1 each-beneficiary hide": "col-sm-12 col-md-10 each-beneficiary offset-md-1"} key={key} id={"beneficiary-"+key}>
                                        <div className="al-card beneficiary-card">
                                            <div className="clearfix">
                                                <div className="network-img">
                                                    {/* <img src="img/airtel.png" srcset="img/airtel@2x.png 2x"/> */}
                                                    <i className="demo-icon icon-bank-building" aria-hidden="true"></i>
                                                </div>
                                                <div className="all-info">
                                                    <p className="summary-info"> <span className="nickname-text">{ben.Nickname}</span>  <span> <a onClick={()=>this.toggleModal(ben,'beneficiary-'+key)} ><i className="fa fa-trash-o" aria-hidden="true"></i></a>  </span> </p>
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
                        {(beneficiaries.length>1) && 
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
            // if(props.beneficiary_delete_state === DELETE_TRANSFER_BENEFICIARY_SUCCESS){
            // let benDeleteStatus = props.beneficiary_delete_state;
            // let beneficiaries = props.beneficiaries.beneficiaries_data.response.data;
            // let deleteIndex = beneficiaries.findIndex(item=>{item.AccountNumber === this.state.beneficiaryToDelete.AccountNumber});
            
            //     beneficiaries.splice(deleteIndex,1);
            //     console.error('remainning ones', beneficiaries);
        
                // 
                // console.log('to remove is', this.state.elemToDelete);
                if(document.getElementById(''+this.state.elemToDelete)){
                    document.getElementById(''+this.state.elemToDelete).remove();
                    this.toggleModal();
                }
                
           
            // }
        
    }
    
    confirmDeleteTransferBeneficiary(){
        const { dispatch } = this.props;
       
        let beneficiary = this.state.beneficiaryToDelete;
            beneficiary.TransactionPin = '0000';
            this.setState({beneficiaryToDelete: beneficiary});
            
        dispatch(deleteTransferBeneficiary((this.state.user.token), this.state.beneficiaryToDelete));
       
    }

    fetchBanks(){
        const { dispatch } = this.props;
        dispatch(getBanks(this.state.user.token));
    }

    continueTransfer(e){
        e.preventDefault();
        const {dispatch, account_details} = this.props;
        dispatch(cashTransferData({
            AccountNumber: this.state.accountNumber,
            AccountName: account_details.account_detail_data.response.AccountName,
            BankName: this.state.selectedBank.label,
            BankCode: this.state.selectedBank.value
        }));
        this.props.history.push("/transfer/provide-details");
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
                BankCode: selectedBank.value
            };
            dispatch(accountEnquiry(this.state.user.token, payload));
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
                for(var bank in banksList){
                    options.push({value: banksList[bank].BankCode, label: banksList[bank].BankName});
                }
                const { selectedBank } = this.state;
                return(
                    <Select
                        options={options}
                        // isDisabled={this.state.submitButtonState}
                        isDisabled={props.account_details.fetchStatus}
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
                detailVerificacationStatus} = this.state;
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
                                                                        <button type="submit"  className="btn-alat light-btn m-t-10 m-b-20 text-center">Save</button>
                                                                    </center>
                                                                </div>
                                                                <div className="col-sm-6">
                                                                    <center>
                                                                        <button type="submit" onClick={this.continueTransfer} className="btn-alat m-t-10 m-b-20 text-center">Send</button>
                                                                    </center>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                </div>
                                            </div>

                                            {this.renderBeneficiaries()}
                                            {benDeleteStatus.beneficiary_delete_state ===DELETE_TRANSFER_BENEFICIARY_SUCCESS &&
                                                this.endBeneficiaryDelete()
                                            }
                                            {/* {this.endBeneficiaryDelete()} */}
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
        bankList: state.transfer_bankList,
        beneficiaries: state.transfer_beneficiaries,
        account_details: state.transfer_fetch_user_account,
        beneficiary_delete_state: state.delete_transfer_beneficiaryState
    };
}

export default connect(mapStateToProps)(NewTransfer);
