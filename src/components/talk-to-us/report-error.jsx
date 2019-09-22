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
            Amount:null,
            message:null,
            AmountInvalid:false,
            MessageInvalid:false,
            debitAccount:"",
            isAccountInvalid:false,
            channel:null,
            channelInvalid:false,
            channelFrequency:"",
            TransactionTypeId:"",
            ChannelId:"",
            TransactionDate:null,
            SourceTypeId:""

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
    checkChannelFrequency = () => {
        if (this.state.channel == "") {
            this.setState({ channelInvalid: true });
            return true;
        }
    };
     
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
        console.log(channelId)
        this.setState({ChannelId:channelId });
    };

    handleSelectTrancType=(event)=>{
        let transactionTypeId = event.target.value;
        console.log(transactionTypeId)
        this.setState({TransactionTypeId:transactionTypeId})
    }
    handleChange = (e) => {
        let name = e.target.value;
        console.log(name)
        this.setState({ [name]: e.target.value })
    };
    handleSourceType =(e)=>{
        let sourceType = e.target.value;
        console.log(sourceType);
        this.setState({SourceTypeId:sourceType})

    }

    onSubmit=(event)=>{
        event.preventDefault();
            this.props.dispatch(actions.ReportErrorMessage( {
                "Amount":this.state.Amount,
                "TransactionTypeId":this.state.TransactionTypeId,
                "ChannelId":this.state.ChannelId,
                "TransactionDate":this.state.TransactionDate,
                "Bank":this.state.Bank,
                "SourceTypeId":this.state.SourceTypeId
                
    
            }
        ));
        // }
        
       
    }

    render(){
        const {AmountInvalid, DateErrorInvalid, MessageInvalid,channelInvalid,channelFrequency} =this.state
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
                        {this.props.alert && this.props.alert.message &&
                                                <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                    }
                </center>
                <div className="col-sm-12">
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
                                                            name="startDate"
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
                                                    <div className={!AmountInvalid ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
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
                                                <div className= {channelInvalid ? "form-group col-md-6 " : "form-group col-md-6 form-error"}>
                                                    <label className="label-text">Channel</label>
                                                                    <select name="channelFrequency" className="form-control input-border-radius" onChange={this.handleSelectChannel}>
                                                                            <option>Select Transaction Type</option>
                                                                            {                                      
                                                                                this.props.get_page_data.message === talktoUsConstant.GET_PAGE_DATA_SUCCESS && 
                                                                                this.props.get_page_data.data.response.data.ChannelTypes.map(channel=> {
                                                                            
                                                                                    return <option  value={channel.Id}>
                                                                                    {channel.Type}</option>
                                                                                })
                                                                            }     
                                                                    </select>

                                                        {channelInvalid &&
                                                            <div className="text-danger">Enter Amount</div>
                                                        }
                                        
                                                    </div>
                                                    <div className={!channelInvalid ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
                                                        <label className="label-text">Transaction Type</label>
                                                       
                                                          <select name="channelFrequency" className="form-control input-border-radius" onChange={this.handleSelectTrancType}>
                                                                            <option>Select Transaction Type</option>
                                                                            {                                      
                                                                                this.props.get_page_data.message === talktoUsConstant.GET_PAGE_DATA_SUCCESS && 
                                                                               this.props. get_page_data.data.response.data.TransactionTypes.map(channel=> {
                                                                            
                                                                                    return <option  value={channel.Id}>
                                                                                    {channel.TransactionType}</option>
                                                                                })
                                                                            }     
                                                                    </select>
                                                      

                                                        {channelInvalid &&
                                                            <div className="text-danger">Enter Amount</div>
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
                                                    <div className={!channelInvalid ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
                                                             <label className="label-text">Banks</label>
                                                        <select name="channelFrequency" className="form-control input-border-radius" onChange={this.handleChange}>
                                                                 <option>Select Bank</option>
                                                                    {                                      
                                                                        this.props.GetBankList.message === talktoUsConstant.GET_BANK_LIST_SUCCESS && 
                                                                        this.props.GetBankList.data.response.data.map(bank=> {
                                                                            
                                                                                    return <option  value={bank.BankCode}>
                                                                                    {bank.BankName}</option>
                                                                                })
                                                                            }     
                                                                </select>
                                                     </div>

                                                     <div className={!channelInvalid ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
                                                             <label className="label-text">Source</label>
                                                        <select name="channelFrequency" className="form-control input-border-radius" onChange={this.handleSourceType}>
                                                                 <option>Source Type</option>
                                                                    {                                      
                                                                        this.props.get_page_data.message === talktoUsConstant.GET_PAGE_DATA_SUCCESS && 
                                                                        this.props.get_page_data.data.response.data.SourceTypes.map(source=> {
                                                                            
                                                                                    return <option  value={source.Id}>
                                                                                    {source.SourceType}</option>
                                                                                })
                                                                            }     
                                                                </select>
                                                     </div>
                                                </div>
                                                <div className={MessageInvalid ? "form-group form-error" : "form-group"}>
                                                    <label className="label-text">Additional Information</label>
                                                    <textarea 
                                                        type="text" 
                                                        autoComplete="off" 
                                                        className="form-control" 
                                                         placeholder="Comment Here..."
                                                         name="message"
                                                         value={this.state.message}
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