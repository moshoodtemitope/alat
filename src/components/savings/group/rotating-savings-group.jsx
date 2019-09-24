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
import {GROUPSAVINGSCONSTANT} from "../../../redux/constants/savings/group/index";


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
    {  value: '10', label: "10"},
    {  value: '11', label: "11"},
    {  value: '12', label: "12"}
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
            startDate: null,
            Frequency:"",            
            startDateValidity: false,
            NoOfMembers: false,
            monthlyContributionValidity: false,
            groupNameValidity: false,
            selectAccountValidity: false,
            
            amountToBeWithDrawn:null,
            howOftenDoYouWantToSave: null,
            
            groupName: "",
            monthlyContribution: "",
            numberOfMembers: "",
        }
    }

    checkingUserInputs = () => {
        var result = "valid";
        for(let x in this.state){
            switch(x){
                case 'groupName':
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
                case 'startDate':
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

    
    handleSelectedDate = (startDate) => {
        this.setState({
            startDate: startDate
        });
        // this.props.dispatch(actions.setAutomateSavingsStartDate(startDate));
    }

    //1
    validateStartDate=()=>{
        if(this.state.startDate == null || this.state.startDate == ""){
            this.setState({startDateValidity: true});
            return true;
        }else {this.setState({startDateValidity : false});
            return false;
        }
    }
    //2
    validateNoOfMembers=()=>{
        if(this.state.numberOfMembers == null || this.state.numberOfMembers == ""){
            this.setState({NoOfMembers: true});
            return true;
        }else {this.setState({NoOfMembers : false});
            return false;
        }
    }
    
    //3
    validateMonthlyContributionValidity = () => {
        if(this.state.monthlyContribution == null || this.state.monthlyContribution == ""){
            this.setState({monthlyContributionValidity: true});
            return true;
        }else {this.setState({monthlyContributionValidity : false});
            return false;
        }
    }

    //4
    validateGroupName = () => {
        if(this.state.groupName == null || this.state.groupName == ""){
            this.setState({groupNameValidity: true});
            return true;
        }else {this.setState({groupNameValidity : false});
            return false;
        }
    }

    //5
    validateSelectedAccount = () => {
        if(this.state.selectedAccount == null || this.state.selectedAccount == ""){
            this.setState({selectAccountValidity: true});
            return true;
        }else {this.setState({selectAccountValidity : false});
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

   
    handleSelectChange = (Frequency) => {
        this.setState({ numberOfMembers: Frequency.value
              });
      
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
        this.validateMonthlyContributionValidity();
        this.validateNoOfMembers();
        this.validateStartDate();
        this.validateGroupName();
        this.validateSelectedAccount();
        //this.SubmitAutomatedGroupSavings();
        
        switch(this.checkingUserInputs()){
            case null:
                console.log('contains a lot of empty fields');
                break;
            case 'valid': 
                this.SubmitAutomatedGroupSavings();
        }
    }

    NavigateToGroupSavings = () => {
        
            history.push('/savings/activityDashBoard');
        
    }

    

    render() {
        const {selectedAccount,numberOfMembers, startDateValidity, NoOfMembers,groupNameValidity,
            monthlyContributionValidity, selectAccountValidity
        } = this.state;

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
                                            <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
                                            
                                        {/* <li><a href="#">Investments</a></li> */}

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {this.props.alert && this.props.alert.message &&
                                <div style={{width: "100%"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                } 
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                       <h4 className="m-b-10 center-text hd-underline">Create A Rotating Savings Group</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-row">
                                                    <div className={groupNameValidity ? " form-group form-error col-md-12" : "form-group col-md-12"}>
                                                    <label className='label-text'>Give your group a name</label>
                                                    <input type="text" placeholder="Dubai Goal" onChange={this.handleGroupName}/>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className={monthlyContributionValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                         <label className="label-text">Monthly Contributions</label>
                                                         <input type="number" placeholder="N 100,000" onChange={this.handleMonthlContributions}/>
                                                    </div>
                                                    <div className={NoOfMembers ? "form-group form-error col-md-6" : "form-group col-md-6"}>
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
                                                            minDate={new Date()}
                                                        />   
                                                    </div>
                                        
                                                </div>

                                                <div className="form-row">
                                                       <div className={selectAccountValidity ? "form-error col-sm-12" : "col-sm-12"}>
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
                                                           
                                                                  <button disabled={this.props.createRotatingGroupSavings.message ===GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP} type="submit" className="btn-alat m-t-10 m-b-20 text-center">{
                                                                     this.props.createRotatingGroupSavings.message ===GROUPSAVINGSCONSTANT.CREATE_ROTATING_GROUP ? 'Processing...':'Create Group'
                                                                  }</button>
                                                        
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
        createGroupSavings: state.createRotatingGroupSavings,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        createRotatingGroupSavings:state.createRotatingGroupSavings,
        alert:state.alert
    }
}
export default connect(mapStateToProps)(RotatingGroup);
