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
import * as actions from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';

const quantityOfMembers = [
    { value: '1' ,label:"1" },
    {  value: '2' , label:"2" },
    {  value: '3' , label:"3" },
    {  value: '4', label: "4"},
    {  value: '5', label: "5"},
    {  value: '6', label: "6"},
    {  value: '7', label: "7"},
    {  value: '8', label: "8"},
    {  value: '9', label: "9"},
    {  value: '10', label: "10"}
];

class RotatingGroup extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            isSubmitted: null,
            isAccountInvalid: null,
            accountNumber: null,
            selectedAccount: null,
            numberOfMembers: "",
            Frequency:"",

            howMuchValidity:false,
            endDateValidity:false,
            startDateValidity:false,
            amountToContributeValidity:false,
            startDate: new Date(),
            endDate: new Date(),
            amountToBeWithDrawn:null,
            howOftenDoYouWantToSave: null,
            
            groupName: "",
            monthlyContribution: "",
            numberOfMembers: "",
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
        this.setState({ numberOfMembers: Frequency.value
              });
        //  if (this.state.formsubmitted && Frequency.value != "")
        //   this.setState({ TimeSavedInvalid: false })
        //this.props.dispatch(actions.setFrequency(Frequency.value))
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

    handleGroupName = (event) => {
        this.setState({
            groupName: event.target.value
        })
    }

    handleMonthlContributions = (event) => {
        this.setState({
            monthlyContribution: event.target.value
        })
    }

    SubmitAutomatedGroupSavings = () => {
        const data = {
            Name: this.state.groupName,
            MonthlyContribution: parseFloat(this.state.monthlyContribution),
            NumberOfMembers: parseInt(this.state.numberOfMembers),
            StartDate: this.state.startDate,
            DebitAccount: this.state.selectedAccount
        }

        console.log(data);
        //return
        this.props.dispatch(actions.createRotatingSavings(this.state.user.token, data));
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.SubmitAutomatedGroupSavings();
        console.log('what');
    }

    render() {
        const {selectedAccount,startDate,endDate,amountToContributeValidity,numberOfMembers, endDateValidity, startDateValidity, howMuchValidity,
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
                                        <NavLink to="/savings/goal/group-savings-selection">
                                            <li><a href="#">Group Savings</a></li>
                                        </NavLink>
                                            
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
                                       <h4 className="m-b-10 center-text hd-underline">Create A Rotating Savings Group</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-row">
                                                   <label className="label-text">Give your group a name</label>
                                                   <input type="text" placeholder="Dubai Goal" onChange={this.handleGroupName}/>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                         <label className="label-text">Monthly Contributions</label>
                                                         <input type="number" placeholder="N 100,000" onChange={this.handleMonthlContributions}/>
                                                    </div>
                                                    <div className={howMuchValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">Number of members?</label>
                                                         <Select type="text" 
                                                            options={quantityOfMembers}
                                                            name="numberOfMembers"
                                                            onChange={this.handleSelectChange}
                                                            value={numberOfMembers.label}
                                                          />
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className={startDateValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
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
                                        
                                                </div>
                                                
                                                <div className="accountSelection">
                                                    <div className='col-sm-12'>
                                                                
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
                                                            {/* <NavLink to='/savings/rotating-group'> */}
                                                                  <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Create Group</button>
                                                            {/* </NavLink> */}
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
        createGroupSavings: state.createRotatingGroupSavings
    }
}
export default connect(mapStateToProps)(RotatingGroup);
