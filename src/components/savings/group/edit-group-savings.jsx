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
import {GROUPSAVINGSCONSTANT} from "../../../redux/constants/savings/group/index";
import {history} from '../../../_helpers/history';
import { numberWithCommas, getDateFromISO } from "../../../shared/utils";


    
class EditGroupSavings extends React.Component {
    constructor(props){
        console.log("this is the props", props.location.data.response)
        super(props);
        this.state= {
            user: JSON.parse(localStorage.getItem("user")),
            isAccountInvalid: null,
            // accountNumber: null,
            selectedAccount: null,
            groupName: null,
            groupPurpose: null,
            targetAmount: numberWithCommas(this.props.location.data.response.targetAmount) || null,
            minimumIndividualAmount: null,
            targetDate: getDateFromISO(this.props.location.data.response.targetDate) ||null,
            howMuchValidity: false,
            GroupEndDate: false,
            AmountToContribute: false,
            NoAccountSelectionWasDon: false,
            theGroupName: false,
            Purpose: false,
        }
      
    }

    componentDidMount = () => {
        if(this.props.groupDetails != undefined){
            window.localStorage.setItem('groupId', this.props.groupDetails.response.id);
            this.InitialPropertyCheck();
        }
    }

    GetGroupData = () => {
         let Store = window.localStorage;
         let data = {
             groupId: Store.getItem('groupId')
         }
    
         this.props.dispatch(actions.groupDetails(this.state.user.token, data));
    }

    handleSelectDebitableAccounts = (account) => {
        this.setState({ selectedAccount: account })
    }
    
    checkAccountNumber() {
        if (this.state.selectedAccount.length != 10) {
            this.setState({ isAccountInvalid: true })
            return true;
        }
    }
    
    checkingUserInputs = () => {
        var result = "valid";
        for(var x in this.state){
            switch(x){
                case 'groupName':
                   if(this.state[x] == null || this.state[x] == ""){
                    //   console.log(x)
                      result = null;
                      break;
                   }     
                case 'groupPurpose':
                   if(this.state[x] == null || this.state[x] == ""){
                    //    console.log(x)
                       result = null;
                       break;
                   }
                case 'targetAmount':
                   if(this.state[x] == null || this.state[x] == ""){
                    //   console.log(x)
                      result = null;
                      break;
                   }
                case 'minimumIndividualAmount':
                   if(this.state[x] == null || this.state[x] == ""){
                    //   console.log(x)
                      result = null;
                      break;
                   }
                case 'targetDate':
                   if(this.state[x] == null || this.state[x] == ""){
                    //   console.log(x) 
                      result = null;
                      break;
                   }
                case 'selectedAccount':
                      if(this.state[x] == null || this.state[x] == ""){
                        // console.log(x) 
                        result = null;
                        break;
                      }
            }
        }
        // console.log(result);
        return result;
    }

    SetName = (event) => {
        this.setState({groupName: event.target.value})
    }

    SetTargetAmount = (event) => {
        this.setState({targetAmount: numberWithCommas(event.target.value)})
    }

    SetPurpose = (event) => {
        this.setState({groupPurpose: event.target.value})
    }

    SetStartDate = (targetDate) => {
       this.setState({
           targetDate:targetDate
       })
    }

    SetAmountToContributeIndividually = (event) => {
        this.setState({minimumIndividualAmount: numberWithCommas(event.target.value)});
    }

    checkGroupName = () => {
        if(this.state.groupName == null || this.state.groupName == ""){
            this.setState({theGroupName: true})
            return false;
        }else{
            this.setState({theGroupName: false});
            return true;
        }
    }
    
    checkGroupPurpose = () => {
        if(this.state.groupPurpose == null || this.state.groupPurpose == ""){
            this.setState({Purpose: true})
            return false;
        }else{
            this.setState({Purpose: false});
            return true;
        }
    }

    checkTheTargetAmount = () => {
        if(this.state.targetAmount == null || this.state.targetAmount == "") {
            this.setState({howMuchValidity: true})
            return false;
        }else{
            this.setState({howMuchValidity: false})
            return true;
        }
    }

    checkTheEndDate = () => {
        if(this.state.targetDate == null || this.state.targetDate == ""){
            this.setState({GroupEndDate: true});
            return false;
        }else{
            this.setState({GroupEndDate: false});
            return true;
        }
    }

    checkTheSelectedAccount = () => {
        if(this.state.selectedAccount == null || this.state.selectedAccount == ""){
            this.setState({NoAccountSelectionWasDon: true});
            return false;
        }else{
            this.setState({NoAccountSelectionWasDon: false})
            return true;
        }  
    }

    checkMinimumAccountToContribute = () => {
        if(this.state.minimumIndividualAmount == null || this.state.minimumIndividualAmount == ""){
            this.setState({AmountToContribute: true});
            return false;
        }else{
            this.setState({AmountToContribute: false})
            return true;
        }
    }

    // checkingUserInputs = () => {
    //     let result = "valid";
    //     for(var x in this.state){
    //         switch(x){
    //             case 'howMuchValidity':
    //                 if(this.state[x] == null || this.state[x] == ""){
    //                     console.log(x)
    //                     result = null;
    //                     break;
    //                 }     
    //             case 'GroupEndDate':
    //                 if(this.state[x] == null || this.state[x] == ""){
    //                     console.log(x)
    //                     result = null;
    //                     break;
    //                 }     
    //             case 'AmountToContribute':
    //                 if(this.state[x] == null || this.state[x] == ""){
    //                     console.log(x)
    //                     result = null;
    //                     break;
    //                 }  
    //             case 'NoAccountSelectionWasDon':
    //                 if(this.state[x] == null || this.state[x] == ""){
    //                     console.log(x)
    //                     result = null;
    //                     break;
    //                 }   
    //             case 'theGroupName':
    //                 if(this.state[x] == null || this.state[x] == ""){
    //                     console.log(x)
    //                     result = null;
    //                     break;
    //                 }        
    //             case 'Purpose':
    //                 if(this.state[x] == null || this.state[x] == ""){
    //                     console.log(x)
    //                     result = null;
    //                     break;
    //                 }          
    //         }
    //     }

    //     // console.log(result);
    //     return result;
    // }

    SubmitTargetGoalEdited = () => {
        const data = {
            groupId: this.props.groupDetails.response.id,
            name: this.state.groupName,
            targetAmount: parseFloat(this.state.targetAmount),
            targetDate: this.state.targetDate,
            minimumIndividualAmount: parseFloat(this.state.minimumIndividualAmount),
            debitAccount: this.state.selectedAccount,
            purpose: this.state.groupPurpose, 
        }

        this.props.dispatch(actions.editGroup(this.state.user.token, data));
    }

    InitialPropertyCheck = () => {
       setTimeout(() => {
            if(this.props.groupDetails != undefined){
                this.setState({groupName: this.props.groupDetails.response.name});
                this.setState({targetAmount: this.props.groupDetails.response.targetAmount});
                ///this.setState({targetDate: this.props.groupDetails.response.targetDate});
                this.setState({minimumIndividualAmount: this.props.groupDetails.response.minimumIndividualAmount});
                this.setState({selectedAccount: this.props.groupDetails.response.debitAccount});
                this.setState({groupPurpose: this.props.groupDetails.response.purpose});
            }
       }, 1000);
    }

    handleSubmit = (event) => {
         event.preventDefault();
         this.checkGroupName();  
         this.checkGroupPurpose();
         this.checkTheTargetAmount();
         this.checkTheEndDate();  
         this.checkTheEndDate(); 
         this.checkTheSelectedAccount(); 
         this.checkMinimumAccountToContribute(); 

         switch(this.checkingUserInputs()){
            case null:
               return;
            case 'valid':
               this.SubmitTargetGoalEdited();
         }
        
    }

    NavigateToGroupSavings = () => {
        history.push('/savings/activityDashBoard');
    }

    render() {
        const {targetDate, theGroupName, Purpose, howMuchValidity, GroupEndDate, AmountToContribute, NoAccountSelectionWasDon, selectedAccount} = this.state;

        if(this.props.theGroupDetails.data ==undefined){
            this.GetGroupData();
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                                {/* <li><a href="#">Investments</a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p>Loading Data wait for it ...</p>
                            </div>
    
                </Fragment>
            );
        }
        if(this.props.theGroupDetails.message === GROUPSAVINGSCONSTANT.EDITGROUP){
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                                {/* <li><a href="#">Investments</a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p>Loading Data wait for it ...</p>
                            </div>
    
                </Fragment>
            );
        }

        if(this.props.theGroupDetails.message === GROUPSAVINGSCONSTANT.EDITGROUP_SUCCESS){
            this.InitialPropertyCheck();
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
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
                                           <h4 className="m-b-10 center-text hd-underline"> Edit Target Goal </h4>
    
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className={theGroupName ? "form-group form-error" : "form-group"}>
                                                        
                                                           <label>Give your group a name</label>
                                                    <input defaultValue={this.props.location.data.response.name} type="text" className="form-control" onChange={this.SetName} placeholder="Dubai Goal"/>
                                                       
                                                    </div>
                                                    <div className="form-row">
                                                        <div className={Purpose ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">What is the purpose of this group?</label>
                                                        <input defaultValue={this.props.location.data.response.purpose} type="text" className="form-control" onChange={this.SetPurpose} placeholder="Raise Money"/>
                                                        </div>  
                                                        <div className={howMuchValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">How much is the group raising?</label>
                                                            <input type="Number" className="form-control" 
                                                                value={this.state.targetAmount}
                                                                onChange={this.SetTargetAmount} placeholder="N100, 0000"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className={GroupEndDate ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">when does the group want to meet this goal</label>
                                                            <DatePicker 
                                                            className="form-control" 
                                                            // selected={targetDate} 
                                                            value={targetDate}
                                                            placeholder="June 31, 2019"
                                                            dateFormat=" MMMM d, yyyy"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            onChange={this.SetStartDate}
                                                            dropdownMode="select"
                                                            
                                                            />
                                                           
                                                        </div>
                                                        <div className={AmountToContribute ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">Amount to contribute per person (optional)</label>
                                                            <input type="Number" className="form-control" 
                                                                value={this.state.minimumIndividualAmount}
                                                                onChange={this.SetAmountToContributeIndividually} placeholder="E.g. ₦100,000"/>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className={NoAccountSelectionWasDon ? "form-error" : "accountSelection"}>
                                                        <div className='col-sm-12'>
                                                                  
                                                                        <SelectDebitableAccounts
                                                                            options={selectedAccount}
                                                                            // value={this.state.selectedAccount}
                                                                            accountInvalid={this.state.isAccountInvalid}
                                                                            onChange={this.handleSelectDebitableAccounts}
                                                                            options={selectedAccount}
                                                                            labelText="Select Account to debit" />
                                                                  
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                                {/* <NavLink to='/savings/group/group-created'> */}
                                                                      <button
                                                                      disabled={this.props.data.message == GROUPSAVINGSCONSTANT.CREATEGROUPSAINGSPENDING}
                                                                       type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                                       {this.props.data.message == GROUPSAVINGSCONSTANT.CREATEGROUPSAINGSPENDING ? "Processing..." :"Next"}
    
                                                                       </button>
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
    
                </Fragment>
            );
        }

        if(this.props.theGroupDetails.message == GROUPSAVINGSCONSTANT.EDITGROUP_ERROR){
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                                {/* <li><a href="#">Investments</a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p>Please Check Your Network ...</p>
                            </div>
    
                </Fragment>
            );
        }

        if(this.props.theGroupDetails != undefined){
            let defaultAmount = numberWithCommas(this.props.location.data.response.targetAmount);
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
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
                                           <h4 className="m-b-10 center-text hd-underline"> Edit Target Goal </h4>
    
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className={theGroupName ? "form-group form-error" : "form-group"}>
                                                        
                                                           <label>Give your group a name</label>
                                                    <input defaultValue={this.props.location.data.response.name} type="text" className="form-control" onChange={this.SetName} placeholder="Dubai Goal"/>
                                                       
                                                    </div>
                                                    <div className="form-row">
                                                        <div className={Purpose ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">What is the purpose of this group?</label>
                                                        <input defaultValue={this.props.location.data.response.purpose} type="text" className="form-control" onChange={this.SetPurpose} placeholder="Raise Money"/>
                                                        </div>
                                                        <div className={howMuchValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">How much is the group raising?</label>
                                                        <input 
                                                            // defaultValue={numberWithCommas(defaultAmount)} 
                                                            value={this.state.targetAmount}
                                                            className="form-control" onChange={this.SetTargetAmount} placeholder="N100, 0000"/>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className={GroupEndDate ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">when does the group want to meet this goal</label>
                                                            <DatePicker className="form-control" 
                                                            // selected={targetDate} 
                                                            placeholder="June 31, 2019"
                                                            value={targetDate}
                                                            dateFormat=" MMMM d, yyyy"
                                                            showMonthDropdown
                                                            showYearDropdown
                                                            onChange={this.SetStartDate}
                                                            dropdownMode="select"
                                                            
                                                            />
                                                           
                                                        </div>
                                                        <div className={AmountToContribute ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                            <label className="label-text">Amount to contribute per person (optional)</label>
                                                        <input defaultValue={numberWithCommas(this.props.location.data.response.mininumIndividualAmount)} className="form-control" 
                                                            value={this.state.minimumIndividualAmount}
                                                            onChange={this.SetAmountToContributeIndividually} placeholder="E.g. ₦100,000"/>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className={NoAccountSelectionWasDon ? "form-error" : "accountSelection"}>
                                                        <div className='col-sm-12'>
                                                                  
                                                                        <SelectDebitableAccounts
                                                                            options={selectedAccount}
                                                                            // value={this.state.selectedAccount}
                                                                            accountInvalid={this.state.isAccountInvalid}
                                                                            onChange={this.handleSelectDebitableAccounts}
                                                                            options={selectedAccount}
                                                                            labelText="Select Account to debit" />
                                                                  
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
                                                                {/* <NavLink to='/savings/group/group-created'> */}
                                                                      <button
                                                                      disabled={this.props.data.message == GROUPSAVINGSCONSTANT.CREATEGROUPSAINGSPENDING}
                                                                       type="submit" className="btn-alat m-t-10 m-b-20 text-center">
                                                                       {this.props.data.message == GROUPSAVINGSCONSTANT.CREATEGROUPSAINGSPENDING ? "Processing..." :"Next"}
    
                                                                       </button>
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
    
                </Fragment>
            );
        }
    }
}

function mapStateToProps(state){
    return {
        data: state.groupSavings,
        alert: state.alert,
        groupDetails: state.groupDetails.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        theGroupDetails: state.groupDetails
    }
}
export default connect(mapStateToProps)(EditGroupSavings);







































