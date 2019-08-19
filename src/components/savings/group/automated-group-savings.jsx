import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import {history} from '../../../_helpers/history';

const selectedTime = [
    { value: 'Daily' ,label:"Daily" },
    {  value: 'Weekly' , label:"Weekly" },
    {  value: 'Monthly' , label:"Monthly" }
];

if(window.performance.navigation.type == 1)
    window.location.replace("http://localhost:8080/");

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

            howMuchValidity:false,
            endDateValidity:false,
            startDateValidity:false,
            amountToContributeValidity:false,
            startDate: new Date(),
            endDate: new Date(),
            amountToBeWithDrawn:null,
            howOftenDoYouWantToSave: null

        }
    }

    checkingUserInputs = () => {
        var result = "valid";
        for(var x in this.state){
            switch(x){
                case 'endDate':
                   if(this.state[x] == new Date() || this.state[x] == ""){
                      console.log(x)
                      result = null;
                      break;
                   }     
                case 'amountToContributeValidity':
                   if(this.state[x] == null || this.state[x] == ""){
                       console.log(x)
                       result = null;
                       break;
                   }
                case 'howOftenDoYouWantToSave':
                   if(this.state[x] == null || this.state[x] == ""){
                      console.log(x)
                      result = null;
                      break;
                   }
                case 'selectedAccount':
                   if(this.state[x] == null || this.state[x] == ""){
                      console.log(x)
                      result = null;
                      break;
                   }
            }
        }
        console.log(result);
        return result;
    }

    validateEndDate=()=>{
        if(this.state.endDate == null || this.state.endDate == ""){
            this.setState({endDateValidity: true});
            return true;
        }else {this.setState({endDateValidity : false});
           return false;
        }
    }

    handleSelectedDate = (startDate) => {
        this.setState({
            startDate: startDate
        });
        // this.props.dispatch(actions.setAutomateSavingsStartDate(startDate));
    }

    handleEndDate = (endDate) => {
        this.setState({
            endDate: endDate
        })
        // this.props.dispatch(actions.setAutomateSavingsEndDate(endDate));
    }

    validateStartDate=()=>{
        if(this.state.startDate == null || this.state.startDate == ""){
            this.setState({startDateValidity: true});
            return true;
        }else {this.setState({startDateValidity : false});
            return false;
        }
    }

    validateFrequencyOfWithdrawals=()=>{
        if(this.state.howOftenDoYouWantToSave == null || this.state.howOftenDoYouWantToSave == ""){
            this.setState({howMuchValidity: true});
            return true;
        }else {this.setState({howMuchValidity : false});
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

    handleSelectDebitableAccounts = (account) => {
        console.log('dss', account);
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

    handleSetAmount = (event) => {
        this.setState({
            amountToBeWithDrawn: event.target.value
        })

        this.props.dispatch(actions.setAmountToWithDraw(event.target.value));
    }

    handleSelectChange = (Frequency) => {
        this.setState({ "goalFrequency": Frequency.value
              });
        //  if (this.state.formsubmitted && Frequency.value != "")
        //   this.setState({ TimeSavedInvalid: false })
        this.props.dispatch(actions.setFrequency(Frequency.value))
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
        // console.log(this.state.startDate)
        // const theStartDate = this.state.startDate.split("-");
        // const day = theStartDate[2].split('T')[0];
        // const month = theStartDate[1] - 1;
        // const year = theStartDate[0];
        // const actualDate = new Date(year, month, day);
        
        const data = {
            GroupId: parseInt(this.props.groupDetails.response.id),
            StartDate: this.state.startDate,
            Frequency: parseInt(this.CheckFrequency(this.state.goalFrequency)),
            Amount: parseFloat(this.state.amountToBeWithDrawn),
            DebitAccount: this.state.selectedAccount
        }

        console.log(data)
        //return;
        this.props.dispatch(actions.scheduleContribution(this.state.user.token, data));
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.SubmitAutomatedGroupSavings();
        console.log('what');
    }

    NavigateToGroupSavings = () => {
        let groupSavings = Object.keys(this.props.groups); //returns an array
        let rotatingSavings = Object.keys(this.props.groupSavingsEsusu); //returns an array
        if(groupSavings.length != 0 || rotatingSavings.length != 0){
            history.push('/savings/activityDashBoard');
            return;
        }
        history.push('/savings/goal/group-savings-selection');
   }

    render() {
        const {selectedAccount,startDate,endDate,amountToContributeValidity,goalFrequency, endDateValidity, startDateValidity, howMuchValidity,
        } = this.state;

        return (
            <Fragment>
                <InnerContainer>
                    <SavingsContainer>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                        <NavLink to='/savings/choose-goal-plan'>
                                            <li><a href="#">Goals</a></li>
                                        </NavLink>
                                        {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                            <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
                                        {/* </NavLink> */}
                                            
                                        <li><a href="#">Investments</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                       <h4 className="m-b-10 center-text hd-underline">Automate Group Savings</h4>
                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-row">
                                                    <div className={howMuchValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">How would you like to save?</label>
                                                         <Select type="text" 
                                                            options={selectedTime}
                                                            name="goalFrequency"
                                                            onChange={this.handleSelectChange}
                                                            value={goalFrequency.label}
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
                                                        />
                                                        
                                                    </div>
                                                    <div className={amountToContributeValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">how much should we take from your account?</label>
                                                        <input type="text" className="form-control"  placeholder="E.g. ₦100,000" onChange={this.handleSetAmount}/>
                                                    </div>
                                                </div>
                                                   
                                                <div className="accountSelect">
                                                        <SelectDebitableAccounts
                                                                                accountInvalid={this.state.isAccountInvalid}
                                                                                onChange={this.handleSelectDebitableAccounts}
                                                                                labelText="Select Account to debit" 
                                                                                options={selectedAccount}/>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <NavLink to='/savings/group/success-message'>
                                                                  <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Accept</button>
                                                            </NavLink>
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

                    </SavingsContainer>
                </InnerContainer>
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
        groups: state.customerGroup.data
    }
}
export default connect(mapStateToProps)(AutomateGroupSavings);
