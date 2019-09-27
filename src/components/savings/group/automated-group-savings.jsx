import * as React from "react";
import {Fragment} from "react";
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import {history} from '../../../_helpers/history';
import {GROUPSAVINGSCONSTANT} from '../../../redux/constants/savings/group/index'
const selectedTime = [
    { value: 'Daily' ,label:"Daily" },
    {  value: 'Weekly' , label:"Weekly" },
    {  value: 'Monthly' , label:"Monthly" }
];

class AutomateGroupSavings extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            isSubmitted: null,
            isAccountInvalid: null,
            accountNumber: null,
            selectedAccount: null,
            goalFrequency: "",
            Frequency:"",

            frequencyValidity:false,
            endDateValidity:false,
            startDateValidity:false,
            amountToContributeValidity:false,
            selectedAccountValidity: false,
            startDate: null,
            endDate: null,
            amountToBeWithDrawn:null,
            howOftenDoYouWantToSave: ""

        }
    }

    componentDidMount = () => {
       if(this.props.groupDetails != undefined)
             window.localStorage.setItem('groupId', this.props.groupDetails.response.id);
    }

    checkingUserInputs = () => {
        var result = "valid";
        for(var x in this.state){
            switch(x){
                case 'startDate':
                   if(this.state[x] == null || this.state[x] == ""){
                    //   console.log(x)
                      result = null;
                      break;
                   }     
                case 'endDate':
                   if(this.state[x] == null || this.state[x] == ""){
                    //   console.log(x)
                      result = null;
                      break;
                   }     
                case 'amountToBeWithDrawn':
                   if(this.state[x] == null || this.state[x] == ""){
                    //    console.log(x)
                       result = null;
                       break;
                   }
                case 'howOftenDoYouWantToSave':
                   if(this.state[x] == null || this.state[x] == ""){
                    //   console.log(x)
                      result = null;
                      break;
                   }
                case 'selectedAccount':
                   if(this.state[x] == null || this.state[x] == ""){
                    //   console.log(x)
                      result = null;
                      break;
                   }
            }
        }
        // console.log(result);
        return result;
    }

    validateStartDate=()=>{
        if(this.state.startDate == null || this.state.startDate == ""){
            this.setState({startDateValidity: true});
            return true;
        }else {this.setState({startDateValidity : false});
            return false;
        }
    }

    validateEndDate=()=>{
        if(this.state.endDate == null || this.state.endDate == ""){
            this.setState({endDateValidity: true});
            return true;
        }else {this.setState({endDateValidity : false});
           return false;
        }
    }


    validateFrequencyOfWithdrawals=()=>{
        if(this.state.howOftenDoYouWantToSave == null || this.state.howOftenDoYouWantToSave == ""){
            this.setState({frequencyValidity: true});
            return true;
        }else {this.setState({frequencyValidity : false});
            return false;
        }
    }

    validateAmountToBeWithDrawn=()=>{
        if(this.state.amountToBeWithDrawn == null || this.state.amountToBeWithDrawn == ""){
            this.setState({amountToContributeValidity: true});
            return true;
        }else {this.setState({amountToContributeValidity : false});
            return false;
        }
    }

    validateSelectedAccount = () => {
        if(this.state.selectedAccount == null || this.state.selectedAccount == ""){
            this.setState({selectedAccountValidity: true});
            return true;
        }else {this.setState({SelectDebitableAccounts : false});
            return false;
        }
    }

    handleSelectDebitableAccounts = (account) => {
        // console.log('dss', account);
        this.setState({ selectedAccount: account });
        if (this.state.isSubmitted) { 
            if(account.length == 10)
            this.setState({ isAccountInvalid: false })
         }
    }
    
    checkAccountNumber = () => {
        if (this.state.selectedAccount.length != 10) {
            this.setState({ isAccountInvalid: true })
            return true;
        }
    }

    handleSelectedDate = (startDate) => {
        this.setState({
            'startDate': startDate
        });
        // this.props.dispatch(actions.setAutomateSavingsStartDate(startDate));
    }

    handleEndDate = (endDate) => {
        this.setState({
            'endDate': endDate
        })
        // this.props.dispatch(actions.setAutomateSavingsEndDate(endDate));
    }

    handleSetAmount = (event) => {
        this.setState({
            'amountToBeWithDrawn': event.target.value
        })

        this.props.dispatch(actions.setAmountToWithDraw(event.target.value));
    }

    handleSelectChange = (Frequency) => {
        this.setState({ "howOftenDoYouWantToSave": Frequency.value,
                        "howOftenDoYouWantToSave" : Frequency.label

              });
            //   console.log(Frequency.label)
        //  if (this.state.formsubmitted && Frequency.value != "")
        //   this.setState({ TimeSavedInvalid: false })
    }
    
    CheckFrequency = (param) => {
       switch(param){
           case 'Daily':
              return 0;
           case 'Weekly':
              return 1;
           case 'Monthly':
              return 2;
       }
    }

    SubmitAutomatedGroupSavings = () => {
        let data = null;

        if(this.props.groupDetails == undefined){
            data = {
                GroupId: parseInt(window.localStorage.getItem('groupId')),
                StartDate: this.state.startDate,
                Frequency: parseInt(this.CheckFrequency(this.state.howOftenDoYouWantToSave)),
                Amount: parseFloat(this.state.amountToBeWithDrawn),
                DebitAccount: this.state.selectedAccount
            }
        }

        if(this.props.groupDetails != undefined){ 
            data = {
                GroupId: parseInt(this.props.groupDetails.response.id),
                StartDate: this.state.startDate,
                Frequency: parseInt(this.CheckFrequency(this.state.howOftenDoYouWantToSave)),
                Amount: parseFloat(this.state.amountToBeWithDrawn),
                DebitAccount: this.state.selectedAccount
            }
        }
        
        this.props.dispatch(actions.scheduleContribution(this.state.user.token, data));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.validateAmountToBeWithDrawn();
        this.validateEndDate();
        this.validateStartDate();
        this.validateFrequencyOfWithdrawals();
        this.validateSelectedAccount();
        
        switch(this.checkingUserInputs()){
            case null:
            //    console.log('Empty fields presents')
               break;
            case 'valid':
               this.SubmitAutomatedGroupSavings();
        }
        
        // console.log('what');
    }

    NavigateToGroupSavings = () => {
        history.push('/savings/activityDashBoard');
    }


    render() {
        const {selectedAccount,startDate,endDate,howOftenDoYouWantToSave,frequencyValidity,amountToContributeValidity,goalFrequency, endDateValidity, startDateValidity, howMuchValidity,
            selectedAccountValidity} = this.state;

        return (
            <Fragment>
                
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                        <NavLink to='/savings/choose-goal-plan'>
                                            <li className="active"><a href="#">Goals</a></li>
                                        </NavLink>
                                            <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
                                            
                                        {/* <li><a href="#">Investments</a></li> */}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {this.props.alert && this.props.alert.message &&
                        <div style={{width: "100%", marginLeft:"150px",marginRight:"150px"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                        }
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                       <h4 className="m-b-10 center-text hd-underline">Automate Group Savings</h4>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-row">
                                                    <div className={frequencyValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">How would you like to save?</label>
                                                         <Select type="text" 
                                                            options={selectedTime}
                                                            name="howOftenDoYouWantToSave"
                                                            onChange={this.handleSelectChange}
                                                            value={howOftenDoYouWantToSave.label}
                                                          />
                                                    </div>
                                                    <div className={endDateValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                            
                                                        <label className="label-text">the group target date is?</label>
                                                        <DatePicker className="form-control" selected={this.state.endDate}
                                                        placeholder="October 31, 2017"
                                                        dateFormat=" MMMM d, yyyy"
                                                        showMonthDropdown
                                                        onChange={this.handleEndDate}
                                                        value={this.state.endDate}
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        minDate={new Date()}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className={startDateValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">when should we start taking the money</label>
                                                        <DatePicker className="form-control" selected={this.state.startDate}
                                                        placeholder="October 31, 2017"
                                                        dateFormat=" MMMM d, yyyy"
                                                        showMonthDropdown
                                                        onChange={this.handleSelectedDate}
                                                        showYearDropdown
                                                        value={this.state.startDate}
                                                        dropdownMode="select"
                                                        minDate={new Date()}
                                                        />
                                                        
                                                    </div>
                                                    <div className={amountToContributeValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">how much should we take from your account?</label>
                                                        <input type="text" className="form-control"  placeholder="E.g. ₦100,000" onChange={this.handleSetAmount}/>
                                                    </div>
                                                </div>
                                                   
                                                <div className="form-row">
                                                      <div className={selectedAccountValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                      <SelectDebitableAccounts
                                                            accountInvalid={this.state.isAccountInvalid}
                                                            onChange={this.handleSelectDebitableAccounts}
                                                            labelText="Select Account to debit" 
                                                            options={selectedAccount}/>
                                                      </div>
                                                </div>
                                                
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            
                                                               <button disabled={this.props.scheduleContribution.message === GROUPSAVINGSCONSTANT.SCHEDULE_CONTRIBUTION}type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                               {this.props.scheduleContribution.message === GROUPSAVINGSCONSTANT.SCHEDULE_CONTRIBUTION?'Processing':'Accept'}
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

                    
            </Fragment>
        );
    }
}

function mapStateToProps(state){
    return {
        groupDetails: state.groupDetails.data,
        startDate: state.automateContributionStartDate.data,
        endDate: state.automateContributionEndDate.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        alert:state.alert,
        scheduleContribution:state.scheduleContribution
    }
}
export default connect(mapStateToProps)(AutomateGroupSavings);
