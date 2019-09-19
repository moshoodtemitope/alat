import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import AmountInput from '../../shared/components/amountInput';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectDebitableAccounts from '../../shared/components/selectDebitableAccounts';
import Select from 'react-select';




const selectedTime = [
           
    { "id":3, value: 'monthly',label:"Monthly" },
    { "id":2, value: 'weekly', label:"Weekly" },
    { "id":1, value: 'daily', label:"Daily"},
   
];


 class ReportError extends Component{
     constructor(props){
         super(props)
         this.state={
            dateError:null,
            DateErrorInvalid:false,
            Amount:null,
            message:null,
            AmountInvalid:false,
            MessageInvalid:false,
            debitAccount:"",
            isAccountInvalid:false,
            channel:null,
            channelInvalid:false,
            channelFrequency:""

         }
         this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);
         this.handleDateError =this.handleDateError.bind(this)

     }


    valDateError = () => {
        if (this.state.dateError == null) {
            this.setState({ DateErrorInvalid: true });
            return true;
        } else {
            this.setState({ DateErrorInvalid: false });
            return false;
        }
    };
    handleDateError = (dateError) => {
        startDate.setHours(startDate.getHours() + 1);
        this.setState({ dateError: dateError });
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
    handleSelectChange = (channel) => {
        this.setState({ "channelFrequency": channel.value,
                        "channelFrequency" : channel.label
              });
        if (this.state.formsubmitted && channel.value != "")
            this.setState({ channelInvalid: false })
    };

    onSubmit(event){
        event.preventDefault();

        if (this.valDateError() || this.checkAmount() ||this.checkChannelFrequency()|| this.checkAccountNumber()) {

        } else {
            // this.setState({isSubmitted : true });
            // this.props.dispatch(actions.fetchFixedGoalStep1({
            //     "goalName":this.state.goalName,
            //     "startDate":this.state.startDate,
            //     "endDate":this.state.endDate,
            //     "targetAmount":this.state.targetAmount,
            //     "goalFrequency":this.state.goalFrequency,
            //     "showInterests":this.state.showInterests
            // }));
            // console.log('tag', '')
        }
        
       
    }

    render(){
        const {AmountInvalid, DateErrorInvalid, MessageInvalid,channelInvalid,channelFrequency} =this.state
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
                                                            selected={this.state.dateError}
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
                                                            value={this.state.dateError}
                                                            
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
                                                 <Select type="text" 
                                                            options={selectedTime}
                                                            name="channelFrequency"
                                                            autoComplete="off"
                                                            onChange={this.handleSelectChange}
                                                            value={channelFrequency.label}
                                                          />
                                                      

                                                        {channelInvalid &&
                                                            <div className="text-danger">Enter Amount</div>
                                                        }
                                        
                                                    </div>
                                                    <div className={!channelInvalid ? "form-group col-md-6" : "form-group col-md-6 form-error"}>
                                                        <label className="label-text">Transaction Type</label>
                                                        <Select type="text" 
                                                            options={selectedTime}
                                                            name="channelFrequency"
                                                            autoComplete="off"
                                                            onChange={this.handleSelectChange}
                                                            value={channelFrequency.label}
                                                          />
                                                      

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
                                                        <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                            Report Error

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

export default ReportError