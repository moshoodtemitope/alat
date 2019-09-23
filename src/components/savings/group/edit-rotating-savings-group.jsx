import * as React from "react";
import {Fragment} from "react";
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import {history} from '../../../_helpers/history';

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

class EditRotatingGroup extends React.Component {
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

            howMuchValidity: false,
            startDateValidity: false,
            accountSelectedValidity: false,
            monthlyContributionValidity: false,
            groupNameValidity: false,
            startDate: "",
            howOftenDoYouWantToSave: null,
            groupName: "",
            monthlyContribution: "",
            numberOfMembers: "",
        }
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
        if(this.state.numberOfMembers == null || this.state.numberOfMembers == ""){
            this.setState({howMuchValidity: true});
            return true;
        }else {this.setState({howMuchValidity : false});
            return false;
        }
    }


    validateGroupName=()=>{
        if(this.state.groupName == null || this.state.groupName == ""){
            this.setState({groupNameValidity: true});
            return true;
        }else {this.setState({groupNameValidity : false});
            return false;
        }
    }

    validateMonthlyContributions = () => {
        if(this.state.monthlyContribution == null || this.state.monthlyContribution == ""){
            this.setState({monthlyContributionValidity: true});
            return true;
        }else {this.setState({monthlyContributionValidity : false});
            return false;
        }
    }

    validateAccountNumber = () => {
        if(this.state.selectedAccount == null || this.state.selectedAccount == ""){
            this.setState({isAccountInvalid: true});
            return true;
        }else {this.setState({isAccountInvalid : false});
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

    checkingUserInputs = () => {
        var result = "valid";
        for(var x in this.state){
            switch(x){
                case 'groupName':
                   if(this.state[x] == new Date() || this.state[x] == ""){
                      console.log(x)
                      result = null;
                      break;
                   }    
                case 'startDate':
                   if(this.state[x] == null || this.state[x] == ""){
                      console.log(x)
                      result = null;
                      break;
                   }     
                case 'monthlyContribution':
                   if(this.state[x] == null || this.state[x] == ""){
                       console.log(x)
                       result = null;
                       break;
                   }
                case 'numberOfMembers':
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


    handleGroupName = (event) => {
        this.setState({
            groupName: event.target.value
        })
    }

    handleSelectedDate = (startDate) => {
        this.setState({
            startDate: startDate
        });
    }

    handleMonthlContributions = (event) => {
        this.setState({
            monthlyContribution: event.target.value
        })
    }

    handleSelectChange = (Frequency) => {
        this.setState({ numberOfMembers: Frequency.value
              });
    }


    SubmitAutomatedGroupSavings = () => {
        const data = {
            GroupId: parseInt(this.props.rotatingGroupDetails.response.id),
            Name: this.state.groupName,
            MonthlyContribution: parseFloat(this.state.monthlyContribution),
            NumberOfMembers: parseInt(this.state.numberOfMembers),
            StartDate: this.state.startDate,
            // DebitAccount: this.state.selectedAccount
        }

        console.log(data);
        //return
        this.props.dispatch(actions.editGroupEsusu(this.state.user.token, data));
    }


    handleSubmit = (event) => {
        event.preventDefault();
        
        this.validateStartDate();
        this.validateFrequencyOfWithdrawals();
        this.validateMonthlyContributions();
        this.validateGroupName();
        this.validateAccountNumber();

        switch(this.checkingUserInputs()){
            case null:
               console.log('Empty fields present');
               break;
            case 'valid':
               this.SubmitAutomatedGroupSavings();
        }
    }

    NavigateToGroupSavings = () => {
        // let groupSavings = this.props.groups.response; //returns an array
        // let rotatingSavings = this.props.groupSavingsEsusu.response; //returns an array
        // if(groupSavings.length != 0 || rotatingSavings.length != 0){
            history.push('/savings/activityDashBoard');
        //     return;
        // }
        // history.push('/savings/goal/group-savings-selection');
    }

    render() {
        const {selectedAccount, numberOfMembers, startDateValidity,
            groupNameValidity, isAccountInvalid, monthlyContributionValidity, howMuchValidity} = this.state;

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
                                       <h4 className="m-b-10 center-text hd-underline">Edit Rotating Savings Group</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-row">
                                                    <div className={groupNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                        <label className="label-text">Give your group a name</label>
                                                        <input type="text" placeholder="Dubai Goal" onChange={this.handleGroupName}/>
                                                   </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className={monthlyContributionValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
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
                                                        <label className="label-text">when does the group wants to meet this goal?</label>
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

                                                <div className="form-row">
                                                    <div className={isAccountInvalid ? "form-group form-error col-md-12" : "form-group col-md-12"}>
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
                                                           
                                                                  <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Create Group</button>
                                                           
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
        createGroupSavings: state.createRotatingGroupSavings.data,
        rotatingGroupDetails: state.rotatingGroupDetails.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data
    }
}
export default connect(mapStateToProps)(EditRotatingGroup);
