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
import { GROUPSAVINGSCONSTANT } from "../../../redux/constants/savings/group";
import { numberWithCommas, getDateFromISO } from "../../../shared/utils";
import moment from 'moment'


const quantityOfMembers = [
    // { value: '1' ,label:"1" },
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
        // console.log('this is the props', props.location.data)
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
            monthlyContribution: numberWithCommas(this.props.location.data.monthlyContribution) ||null,
            
        }
    }

    validateStartDate=()=>{
        if((this.state.startDate == null || this.state.startDate == "")
            && this.props.location.data.startDate==""){
            this.setState({startDateValidity: true});
            return true;
        }else {this.setState({startDateValidity : false});
            return false;
        }
    }

    componentDidMount = () => {
        if(this.props.rotatingGroupDetails != undefined){
            window.localStorage.setItem('rotatingGroupId', this.props.rotatingGroupDetails.response.id);
        }


    }

    FetchRotatingGroupDetails = () => {
        let storage = window.localStorage;
        let data = {
            groupId: JSON.parse(storage.getItem('rotatingGroupId'))
        }
        this.props.dispatch(actions.rotatingGroupDetails(this.state.user.token, data));
    }

    validateFrequencyOfWithdrawals=()=>{
        if((this.state.numberOfMembers == null || this.state.numberOfMembers == "")
            && document.getElementById("numberOfMembers").value==""){
            this.setState({howMuchValidity: true});
            return true;
        }else {this.setState({howMuchValidity : false});
            return false;
        }
    }

    validateGroupName=()=>{
        if((this.state.groupName == null || this.state.groupName == "" ) &&
             document.getElementById("groupName").value=="" ){
            this.setState({groupNameValidity: true});
            return true;
        }else {this.setState({groupNameValidity : false});
            return false;
        }
    }

    validateMonthlyContributions = () => {
        if((this.state.monthlyContribution == null || this.state.monthlyContribution == "")
            && document.getElementById("monthlyContribution").value==""){
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
        // console.log('dss', account);
        this.setState({ selectedAccount: account });
        // console.log("dsdsdsds", account);
        if (this.state.isSubmitted) { 
            if(account.length == 10)
            this.setState({ isAccountInvalid: false })
         }
    }
    

    checkAccountNumber = () => {
        if (this.state.selectedAccount.toString().length != 10) {
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
        // console.log("d=======", this.state)
        for(var x in this.state){
            switch(x){
                case 'groupName':
                   if((this.state.groupName == new Date() || this.state.groupName == "")
                        && document.getElementById("groupName").value==""){
                      
                      result = null;
                      break;
                   }    
                case 'startDate':
                   if((this.state.startDate== null || this.state.startDate== "")
                        && this.props.location.data.startDate==""){
                        
                      result = null;
                      break;
                   }     
                case 'monthlyContribution':
                   if((this.state.monthlyContribution == null || this.state.monthlyContribution == ""
                        && document.getElementById("monthlyContribution").value=="")){
                            
                       result = null;
                       break;
                   }
                case 'numberOfMembers':
                   if((this.state.numberOfMembers == null || this.state.numberOfMembers == "")
                        && document.getElementById("numberOfMembers").value==""){
                            
                      result = null;
                      break;
                   }
                case 'selectedAccount':
                    
                   if(this.state.selectedAccount == null || this.state.selectedAccount == ""){
                        
                      result = null;
                      break;
                   }
            }
        }

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
        // console.log("this is monthly contribution",numberWithCommas(event.target.value))
        this.setState({
            monthlyContribution: numberWithCommas(event.target.value)
        })
    }

    handleSelectChange = (Frequency) => {
        this.setState({ numberOfMembers: Frequency.value
              });
    }


    SubmitAutomatedGroupSavings = () => {
        const data = {
            GroupId: parseInt(this.props.rotatingGroupDetails.response.id),
            Name: (this.state.groupName!==null && this.state.groupName!=="")? this.state.groupName: document.getElementById("groupName").value,
            MonthlyContribution: (this.state.monthlyContribution!==null && this.state.monthlyContribution!=="") ? parseFloat(this.state.monthlyContribution): parseFloat(document.getElementById("monthlyContribution").value),
            NumberOfMembers: (this.state.numberOfMembers !==null && this.state.numberOfMembers !=="") ? parseInt(this.state.numberOfMembers): parseInt(this.props.location.data.memberCount),
            StartDate: (this.state.startDate!==null && this.state.startDate!=="") ? this.state.startDate: new Date(this.props.location.data.startDate),
        }

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
            //    console.log('Empty fields present');
               break;
            case 'valid':
               this.SubmitAutomatedGroupSavings();
        }
    }

    NavigateToGroupSavings = () => {
            history.push('/savings/activityDashBoard');
    
    }

    render() {
        const {selectedAccount, numberOfMembers, startDateValidity,
            groupNameValidity, isAccountInvalid, monthlyContributionValidity, howMuchValidity} = this.state;
        
        if(this.props.rotatingGroupDetailsData.data != undefined){
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
                                            <li>
                                            <NavLink to='/savings/choose-goal-plan'>
                                                Goals
                                                </NavLink>
                                            </li>
                                            <li>
                                            <NavLink to='/savings/activityDashBoard'>
                                                Group Savings
                                            </NavLink>
                                            </li>
                                                {/* <li><a href="#">Investments</a></li> */}

                                        </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="max-600">
                                            <div className="al-card no-pad">
                                            <h4 className="m-b-10 center-text hd-underline editRotHeading">Edit Rotating Savings Group</h4>
    
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="form-row">
                                                        <div className={groupNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Give your group a name</label>
                                                        <input defaultValue={this.props.location.data.name} 
                                                                type="text" 
                                                                id="groupName"
                                                                placeholder="Dubai Goal" onChange={this.handleGroupName}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className={monthlyContributionValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                                <label className="label-text">Monthly Contributions</label>
                                                        <input className="form-control" style={{height:"50px"}} defaultValue={numberWithCommas(this.props.location.data.monthlyContribution)} 
                                                                placeholder="N 100,000" 
                                                                id="monthlyContribution"
                                                                value={this.state.monthlyContribution}
                                                                onChange={this.handleMonthlContributions}/>
                                                        </div>
                                                        <div className={howMuchValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">Number of members?</label>
                                                                <Select type="text"
                                                                defaultValue={{label:this.props.location.data.expectedNumberOfMemebrs, value: this.props.location.data.expectedNumberOfMemebrs}}
                                                                options={quantityOfMembers}
                                                                name="numberOfMembers"
                                                                id="numberOfMembers"
                                                                onChange={this.handleSelectChange}
                                                                value={numberOfMembers.label}
                                                                />
                                                        </div>
                                                    </div>
                                                    {/* <div className="form-row">
                                                        <div className={startDateValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">When does the group wants to meet this goal?</label>
                                                            <DatePicker className="form-control" 
                                                                selected={this.state.startDate}
                                                                placeholder="October 31, 2017"
                                                                // dateFormat=" MMMM d, yyyy"
                                                                showMonthDropdown
                                                                onChange={this.handleSelectedDate}
                                                                minDate={new Date()}
                                                                id="startDate"
                                                                data-propsValue= {getDateFromISO(this.props.location.data.startDate)}
                                                                placeholderText={moment(this.props.location.data.startDate).format("LL")}
                                                                showYearDropdown
                                                                // value={this.state.startDate}
                                                                defaultValue={new Date(this.props.location.data.startDate)}
                                                                dropdownMode="select"
                                                            />
                                                        </div>
                                                        
                                                    </div> */}
    
                                                    {/* <div className="form-row">
                                                        <div className={isAccountInvalid ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <SelectDebitableAccounts
                                                                accountInvalid={this.state.isAccountInvalid}
                                                                onChange={this.handleSelectDebitableAccounts}
                                                                labelText="Select Account to debit"
                                                                // value={this.state.accountNumber} 
                                                                options={selectedAccount}/>
                                                            </div>
                                                    </div> */}
    
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                                
                                                                        <button type="submit" 
                                                                        disabled={this.props.editRotatingSavings.isrequesting}
                                                                        className="btn-alat m-t-10 m-b-20 text-center">
                                                                            
                                                                            {this.props.editRotatingSavings.isrequesting? "Updating group...": "Update Group"}
                                                                        
                                                                        </button>
                                                                
                                                            </center>
                                                        </div>
                                                        {this.props.alert && this.props.alert.message &&
                                                            <div style={{width: "100%"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                                        } 
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
    
        if(this.props.rotatingGroupDetailsData.message === GROUPSAVINGSCONSTANT.EDIT_GROUP_ESUSU){
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
                                            <li>
                                            <NavLink to='/savings/choose-goal-plan'>
                                                Goals
                                                </NavLink>
                                            </li>
                                            <li>
                                            <NavLink to='/savings/activityDashBoard'>
                                                Group Savings
                                            </NavLink>
                                            </li>
                                                {/* <li><a href="#">Investments</a></li> */}

                                        </ul>
                                            {/* <ul>
                                                <NavLink to='/savings/choose-goal-plan'>
                                                    <li>Goals</li>
                                                </NavLink>     
                                                <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
                                            </ul> */}
                                        </div>
                                    </div>
                                </div>
                                <p>Loading data ...</p>
                            </div>
                </Fragment>
            );
        }

        if(this.props.rotatingGroupDetailsData.message === GROUPSAVINGSCONSTANT.EDIT_GROUP_ESUSU_SUCCESS){
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
                                            <li>
                                            <NavLink to='/savings/choose-goal-plan'>
                                                Goals
                                                </NavLink>
                                            </li>
                                            <li>
                                            <NavLink to='/savings/activityDashBoard'>
                                                Group Savings
                                            </NavLink>
                                            </li>
                                                {/* <li><a href="#">Investments</a></li> */}

                                        </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-12">
                                          <div className="max-600">
                                           <div className="al-card no-pad">
                                           <h4 className="m-b-10 center-text hd-underline editRotHeading">Edit Rotating Savings Group</h4>
    
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="form-row">
                                                        <div className={groupNameValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">Give your group a name</label>
                                                            <input type="text" id="groupName" placeholder="Dubai Goal" onChange={this.handleGroupName}/>
                                                       </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className={monthlyContributionValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                             <label className="label-text">Monthly Contributions</label>
                                                             <input type="number" 
                                                                id="monthlyContribution"
                                                                value={this.state.monthlyContribution}
                                                                placeholder="N 100,000" onChange={this.handleMonthlContributions}/>
                                                        </div>
                                                        <div className={howMuchValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">Number of members?</label>
                                                             <Select type="text" 
                                                                options={quantityOfMembers}
                                                                name="numberOfMembers"
                                                                id="numberOfMembers"
                                                                onChange={this.handleSelectChange}
                                                                value={numberOfMembers.label}
                                                              />
                                                        </div>
                                                    </div>
                                                    {/* <div className="form-row">
                                                        <div className={startDateValidity ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <label className="label-text">When does the group wants to meet this goal?</label>
                                                            <DatePicker className="form-control" 
                                                                selected={this.state.startDate}
                                                                placeholder="October 31, 2017"
                                                                dateFormat=" MMMM d, yyyy"
                                                                showMonthDropdown
                                                                onChange={this.handleSelectedDate}
                                                                showYearDropdown
                                                                id="startDate"
                                                                // value={this.state.startDate}
                                                                defaultValue={new Date(this.props.location.data.startDate)}
                                                                dropdownMode="select"
                                                            />
                                                        </div>
                                                        
                                                    </div>
     */}
                                                    {/* <div className="form-row">
                                                        <div className={isAccountInvalid ? "form-group form-error col-md-12" : "form-group col-md-12"}>
                                                            <SelectDebitableAccounts
                                                                accountInvalid={this.state.isAccountInvalid}
                                                                onChange={this.handleSelectDebitableAccounts}
                                                                labelText="Select Account to debit"
                                                                // value={this.state.accountNumber} 
                                                                options={selectedAccount}/>
                                                            </div>
                                                    </div> */}
    
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                                <button type="submit" 
                                                                    disabled={this.props.editRotatingSavings.isrequesting}
                                                                    className="btn-alat m-t-10 m-b-20 text-center">
                                                                    {this.props.editRotatingSavings.isrequesting? "Updating group...": "Update Group"}</button>    
                                                            </center>
                                                        </div>
                                                        {this.props.alert && this.props.alert.message &&
                                                            <div style={{width: "100%"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                                                        }
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

        if(this.props.rotatingGroupDetailsData.message === GROUPSAVINGSCONSTANT.EDIT_GROUP_ESUSU_ERROR){
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
                                            <li>
                                            <NavLink to='/savings/choose-goal-plan'>
                                                Goals
                                                </NavLink>
                                            </li>
                                            <li>
                                            <NavLink to='/savings/activityDashBoard'>
                                                Group Savings
                                            </NavLink>
                                            </li>
                                                {/* <li><a href="#">Investments</a></li> */}

                                        </ul>
                                            {/* <ul>
                                            <NavLink to='/savings/choose-goal-plan'>
                                                <li>Goals</li>
                                            </NavLink>
                                                <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
                                                
                                        
    
                                            </ul> */}
                                        </div>
                                    </div>
                                </div>
                                <p>Please Check Your Internet Connection ...</p>
                            </div>
                </Fragment>
            );
        }

   
        if(this.props.rotatingGroupDetailsData.data == undefined){
            this.FetchRotatingGroupDetails();
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
                                            <li>
                                            <NavLink to='/savings/choose-goal-plan'>
                                                Goals
                                                </NavLink>
                                            </li>
                                            <li>
                                            <NavLink to='/savings/activityDashBoard'>
                                                Group Savings
                                            </NavLink>
                                            </li>
                                                {/* <li><a href="#">Investments</a></li> */}

                                        </ul>
                                            {/* <ul>
                                            <NavLink to='/savings/choose-goal-plan'>
                                                <li>Goals</li>
                                            </NavLink>
                                                <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
                                                
                                        
    
                                            </ul> */}
                                        </div>
                                    </div>
                                </div>
                                <p>Loading data ...</p>
                            </div>
                </Fragment>
            );
        }
        
    }
}

function mapStateToProps(state){
    return {
        createGroupSavings: state.createRotatingGroupSavings.data,
        rotatingGroupDetails: state.rotatingGroupDetails.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        editRotatingSavings: state.editRotatingSavings,
        groups: state.customerGroup.data,
        rotatingGroupDetailsData: state.rotatingGroupDetails,
        alert:state.alert,
    }
}
export default connect(mapStateToProps)(EditRotatingGroup);
