import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectDebitableAccounts from '../../shared/components/selectDebitableAccounts';
import { connect } from 'react-redux';
import {talktoUsConstant} from '../../redux/constants/talk-to-us/talk-to-us.constant';
import * as actions from "../../redux/actions/talk-to-us/talk-to-us-action";






const selectedTime = [
           
    { "id":3, value: 'monthly',label:"Monthly" },
    { "id":2, value: 'weekly', label:"Weekly" },
    { "id":1, value: 'daily', label:"Daily"},
   
];


 class ReportError extends Component{
     constructor(props){
         super(props);
         this.state={
            user: JSON.parse(localStorage.getItem("user")),
            DateErrorInvalid:false,
            Amount:"",
            Description:null,
            AmountInvalid:false,
            MessageInvalid:false,
            debitAccount:"",
            isAccountInvalid:false,
            channel:null,
            Bank:"",
            channelInvalid:false,
            transactiontypeInvalid:false,
            sourceTypeInvalid:false,
            channelFrequency:null,
            TransactionTypeId:null,
            ChannelId:null,
            TransactionDate:null,
            bankInvalid:false,
            SourceTypeId:null,
            BankName:null,
            TransactionType:null,
            SourceType:null,
            

         }
         this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);
         this.handleDateError =this.handleDateError.bind(this)

     }

     componentDidMount(){
         this.fetchPageData();
         this.fetchbankList()
     }
     fetchPageData(){
         const {dispatch}=this.props
         dispatch(actions.GetPageData(this.state.user.token))
     }

     fetchbankList(){
         const {dispatch} =this.props
         dispatch(actions.GetBankList(this.state.user.token))
     }


    valDateError = () => {
        if (this.state.TransactionDate == null) {
            this.setState({ DateErrorInvalid: true });
            return true;
        } else {
            this.setState({ DateErrorInvalid: false });
            return false;
        }
    };
    handleDateError = (TransactionDate) => {
        TransactionDate.setHours(TransactionDate.getHours() + 1);
        this.setState({ TransactionDate: TransactionDate });
    };
    checkAmount = () => {
        if (this.state.Amount == "") {
            this.setState({ AmountInvalid: true });
            return true;
        }
    };
    checkChannelValidity = () => {
        if(this.state.channelFrequency == null || this.state.channelFrequency == ""){
            this.setState({channelInvalid: true});
        }else{
            this.setState({channelInvalid: false});
        }
    }
    checkTransactionTypeValidity =()=>{
        if(this.state.TransactionType ==null || this.state.TransactionType == ""){
            this.setState({transactiontypeInvalid:true});
        }else{
            this.setState({transactiontypeInvalid:false})
        }
    }
    checkBankValidity =()=>{
        if(this.state.BankName ==null || this.state.BankName == ""){
            this.setState({bankInvalid:true});
        }else{
            this.setState({bankInvalid:false})
        }
    }
    checkSourceValidity =()=>{
        if(this.state.SourceType ==null || this.state.SourceType == ""){
            this.setState({sourceTypeInvalid:true});
        }else{
            this.setState({sourceTypeInvalid:false})
        }
    }
    checkValidity = () => {
        let result = 'valid';
        for(let x in this.state){
             switch(x){
                 
                 case 'channelFrequency':
                         if(this.state[x] == null || this.state[x] == ""){
                             console.log(x)
                             result = null;
                             break;
                         }
                case 'TransactionType':
                        if(this.state[x] == null || this.state[x] ==""){
                                 console.log(x)
                                 result =null;
                                 break;
                             }
                 case 'BankName':
                        if(this.state[x] == null || this.state[x] ==""){
                                console.log(x)
                                result =null;
                                break;
                             }
                case 'SourceType':
                        if(this.state[x] == null || this.state[x] ==""){
                             console.log(x)
                            result =null;
                            break;
                        }
 
                 
             }
         }
 
        console.log(result);
        return result;
    }
 

    handleSelectDebitableAccounts(account) {
        console.log('dss', account);
        this.setState({ debitAccount: account })
        if (this.state.isSubmitted) {
            if(account.length == 10)
            this.setState({ isAccountInvalid: false })
         }
    }
    checkAccountNumber() {
        if (this.state.debitAccount.length != 10) {
            this.setState({ isAccountInvalid: true })
            return true;
        }
    }
    
     
    handleAmount = (e) => {
        // console.log
         var intVal = e.target.value.replace(/,/g, '');
         if (/^\d+(\.\d+)?$/g.test(intVal)) {
             // if (parseInt(intVal, 10) <= 2000000) {
             this.setState({ Amount: intVal, Amount: this.toCurrency(intVal) });
             // }
         } else if (e.target.value == "") {
             this.setState({ Amount: "", Amount: "" });
         }
 
         if(this.state.isSubmitted == true)
         if (this.state.formsubmitted) {
                    if (e != "")
                        this.setState( {  AmountInvalid: false });
                }
    };
 
    toCurrency(number) {
         // console.log(number);
         const formatter = new Intl.NumberFormat('en-US', {
             style: "decimal",
             currency: "USD",
             maximumFractionDigits: 2
         });
 
         return formatter.format(number);
    };
    handleSelectChannel = (event) => {
        let channelId = event.target.value;
        let name = event.target.name;

        console.log(channelId)
        this.setState({ChannelId:channelId });
        this.setState({[name] : event.target.value})

    };

    handleSelectTrancType=(event)=>{
        let transactionTypeId = event.target.value;
        let name = event.target.name;


        console.log(transactionTypeId)
        this.setState({TransactionTypeId:transactionTypeId})
        this.setState({[name] : event.target.value})

    }
    handleChange = (e) => {
        let name = e.target.value;
        console.log(name)
        this.setState({ [name]: e.target.value })
    };

    handleBank=()=>{
        let Bank = e.target.value;
        let name = event.target.name;

        console.log(sourceType);
        this.setState({Bank:Bank})
        this.setState({[name] : event.target.value})

    }
    handleSourceType =(e)=>{
        let sourceType = e.target.value;
        let name = event.target.name;

        console.log(sourceType);
        this.setState({SourceTypeId:sourceType})
        this.setState({[name] : event.target.value})

    }
    InitiateNetworkCall=()=>{
        const data ={
            "Amount":this.state.Amount,
            "TransactionTypeId":this.state.TransactionTypeId,
            "ChannelId":this.state.ChannelId,
            "TransactionDate":this.state.TransactionDate,
            "Bank":this.state.Bank,
            "SourceTypeId":this.state.SourceTypeId,
            "Description":this.state.Description

        }
        console.log(data)
        this.props.dispatch(actions.ReportErrorMessage(data))
    }

    onSubmit=(event)=>{
        event.preventDefault();
        this.valDateError()
        this.checkAmount() 
        this.checkAccountNumber() 
        this.checkTransactionTypeValidity();
        this.checkChannelValidity()
        this.checkSourceValidity()
        this.checkBankValidity()

            switch(this.checkValidity()){
                case null:
                  console.log('Empty value was found');
                  break;
                case 'valid': 
                  console.log("No Empty Value Found");
                  this.InitiateNetworkCall();
                  break;
            }
        
       
    }

    render(){
        const {AmountInvalid, DateErrorInvalid,bankInvalid,sourceTypeInvalid, MessageInvalid,channelInvalid,channelFrequency,transactiontypeInvalid} =this.state
        // const {get_page_data} =this.props.get_page_data
        return(
            <div className="row">
                <div className="col-sm-12">
                    <p className="page-title">Talk to Us</p>
                </div>
                <div className="col-sm-12">
                    <div className="tab-overflow">
                        <div className="sub-tab-nav">
                            <ul>
                                <li className="active"><NavLink to="/talk-to-us"> Talk To Us</NavLink></li>
                                <li><NavLink to="/talk-to-us/atm-locator">ATM Locator</NavLink></li>
                                <li><NavLink to="/talk-to-us/report-error">Report An Error</NavLink></li>
                            
                            </ul>
                        </div>
                    </div>
                </div>
                <center>
                        
                </center>
                <div className="col-sm-12">
                {this.props.alert && this.props.alert.message &&
                                                <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                    }
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="max-600">
                                <div className="al-card no-pad">
                                    <h4 className="m-b-10 center-text hd-underline">Report An Error</h4>
                                    
                                    <form onSubmit={this.onSubmit}>

                                    <div className="form-row">
                                        <div className= {!DateErrorInvalid ? "form-group col-md-6 " : "form-group col-md-6 form-error"}>
                                                <label className="label-text">Date of Error </label>
                                                <DatePicker 
                                                            className="form-control"
                                                            selected={this.state.TransactionDate}
                                                            autoComplete="off" 
                                                            placeholderText="Date of Error"
                                                            dateFormat=" MMMM d, yyyy"
                                                            name="TransactionDate"
                                                            peekNextMonth
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            dropdownMode="select"
                                                            useShortMonthInDropdown
                                                            dropdownMode="select"
                                                            minDate={new Date()}
                                                            showWeekNumbers
                                                            onChange={this.handleDateError}
                                                            value={this.state.TransactionDate}
                                                            
                                                    />
                                                        

                                                            {DateErrorInvalid &&
                                                                <div className="text-danger">Enter Date of Error</div>
                                                            }
                                        
                                                    </div>
                                                    <div className={AmountInvalid ? "form-group form-error col-md-6" : "form-group col-md-6 "}>
                                                        <label className="label-text">Amount</label>
                                                        <input 
                                                            className="form-control" 
                                                            autoComplete="off" 
                                                            name="Amount"
                                                            onChange={this.handleAmount}
                                                            placeholder="E.g. ₦100,000"
                                                            value={this.state.Amount}

                                                          
                                                         />
                                                      

                                                        {AmountInvalid &&
                                                            <div className="text-danger">Enter Amount</div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                <div className= {channelInvalid ? "form-group form-error col-md-6  " : "form-group col-md-6"}>
                                                    <label className="label-text">Channel</label>
                                                                    <select  className="form-control input-border-radius" onChange={this.handleSelectChannel} name="channelFrequency">
                                                                            <option>Select Channel</option>
                                                                            {                                      
                                                                                this.props.get_page_data.message === talktoUsConstant.GET_PAGE_DATA_SUCCESS && 
                                                                                this.props.get_page_data.data.response.data.ChannelTypes.map(channel=> {
                                                                            
                                                                                    return <option  value={channel.Id}>
                                                                                    {channel.Type}</option>
                                                                                })
                                                                            }     
                                                                    </select>

                                                        {channelInvalid &&
                                                            <div className="text-danger">Select Channel</div>
                                                        }
                                        
                                                    </div>
                                                    <div className={transactiontypeInvalid ? "form-group form-error col-md-6 " : "form-group col-md-6"}>
                                                        <label className="label-text">Transaction Type</label>
                                                       
                                                          <select  className="form-control input-border-radius" onChange={this.handleSelectTrancType} name="TransactionType">
                                                                            <option>Select Transaction Type</option>
                                                                            {                                      
                                                                                this.props.get_page_data.message === talktoUsConstant.GET_PAGE_DATA_SUCCESS && 
                                                                               this.props. get_page_data.data.response.data.TransactionTypes.map(transac=> {
                                                                            
                                                                                    return <option  value={transac.Id}>
                                                                                    {transac.TransactionType}</option>
                                                                                })
                                                                            }     
                                                                    </select>
                                                      

                                                        {transactiontypeInvalid &&
                                                            <div className="text-danger">Enter Transaction Type</div>
                                                        }
                                                    </div>
                                                </div>


                                                <div className="form-group">
                                                    <SelectDebitableAccounts
                                                    labelText={"Source Account"}
                                                    value={this.state.accountNumber}
                                                    accountInvalid={this.state.isAccountInvalid}
                                                    onChange={this.handleSelectDebitableAccounts} />
                                                </div>
                                                <div className="form-row">
                                                    <div className={bankInvalid ? "form-group form-error col-md-6 " : "form-group col-md-6 "}>
                                                             <label className="label-text">Banks</label>
                                                        <select className="form-control input-border-radius" onChange={this.handleBank} name="BankName" >
                                                                 <option>Select Bank</option>
                                                                    {                                      
                                                                        this.props.GetBankList.message === talktoUsConstant.GET_BANK_LIST_SUCCESS && 
                                                                        this.props.GetBankList.data.response.data.map(bank=> {
                                                                            
                                                                                    return <option  value={bank.BankCode}>
                                                                                    {bank.BankName}</option>
                                                                                })
                                                                            }     
                                                                </select>
                                                                {bankInvalid &&
                                                            <div className="text-danger">Select Bank Name</div>
                                                        }
                                                     </div>

                                                     <div className={sourceTypeInvalid ? "form-group col-md-6 form-error" : "form-group col-md-6 "}>
                                                             <label className="label-text">Source</label>
                                                        <select className="form-control input-border-radius" onChange={this.handleSourceType}  name="SourceType">
                                                                 <option>Source Type</option>
                                                                    {                                      
                                                                        this.props.get_page_data.message === talktoUsConstant.GET_PAGE_DATA_SUCCESS && 
                                                                        this.props.get_page_data.data.response.data.SourceTypes.map(source=> {
                                                                            
                                                                                    return <option  value={source.Id}>
                                                                                    {source.SourceType}</option>
                                                                                })
                                                                            }     
                                                                </select>
                                                        {sourceTypeInvalid &&
                                                            <div className="text-danger">Select Source Type</div>
                                                        }                                                     </div>
                                                </div>
                                                <div className={MessageInvalid ? "form-group form-error" : "form-group"}>
                                                    <label className="label-text">Additional Information</label>
                                                    <textarea 
                                                        type="text" 
                                                        autoComplete="off" 
                                                        className="form-control" 
                                                         placeholder="Comment Here..."
                                                         name="message"
                                                         value={this.state.Description}
                                                         onChange={this.handleChange}
                                                    />
                                                    {MessageInvalid &&
                                                        <div className="text-danger">please enter a message</div>}
                                                    
                                                </div>
                                                
                                           
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    <center>
                                                        <button disabled={this.props.reportError.message === talktoUsConstant.REPORT_ERROR_PENDING} type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                            {this.props.reportError.message ===talktoUsConstant.REPORT_ERROR_PENDING ? 'Processing...':"Report Error"}

                                                        </button>
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
        )
    }
}
const mapStateToProps = state => ({
    alert:state.alert,
    talk_to_us:state.talk_to_us,
    reportError:state.reportError,
    get_bank_branch:state.get_bank_branch,
    get_page_data:state.get_page_data,
    GetBankList:state.GetBankList
});

export default connect (mapStateToProps)(ReportError) 