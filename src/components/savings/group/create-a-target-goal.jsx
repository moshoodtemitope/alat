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
import { numberWithCommas } from "../../../shared/utils";


class CreateATargetGoal extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            user: JSON.parse(localStorage.getItem("user")),
            isAccountInvalid: null,
            // accountNumber: null,
            selectedAccount: null,
            groupName: null,
            groupPurpose: null,
            targetAmount:"",
            minimumIndividualAmount: "",
            targetDate: null,
            howMuchValidity: false,
            GroupEndDate: false,
            AmountToContribute: false,
            NoAccountSelectionWasDon: false,
            theGroupName: false,
            Purpose: false,

            ///Editing Purpose
            edit: false
        }
        
    }

    componentDidMount = () => {
        // this.InitialPropertyCheck();
    }

    handleSelectDebitableAccounts = (account) => {
        // console.log('dss', account);
        this.setState({ selectedAccount: account })
    }
    
    checkAccountNumber() {
        if (this.state.selectedAccount.length != 10) {
            this.setState({ isAccountInvalid: true })
            return true;
        }
    }
    
    checkingUserInputs = () => {
        let result = "valid";
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
                // case 'minimumIndividualAmount':
                //    if(this.state[x] == null || this.state[x] == ""){
                //     //   console.log(x)
                //       result = null;
                //       break;
                //    }
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
       
        this.setState({ targetAmount: numberWithCommas (event.target.value)})
    }

    SetPurpose = (event) => {
        this.setState({groupPurpose: event.target.value})
    }

    SetStartDate = (targetDate) => {
        targetDate.setHours(targetDate.getHours() + 1);
       this.setState({
           targetDate:targetDate
       })
    }

    SetAmountToContributeIndividually = (event) => {
        
        this.setState({ minimumIndividualAmount: numberWithCommas(event.target.value)});
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
        // console.log(this.state.minimumIndividualAmount);
        if(this.state.minimumIndividualAmount == null || this.state.minimumIndividualAmount == ""){
            this.setState({AmountToContribute: true});
            return false;
        }else{
            this.setState({AmountToContribute: false});
            return true;
        }
     }

    SubmitTargetGoal = () => {
        const data = {
            Name:this.state.groupName,
            TargetAmount:this.state.targetAmount,
            TargetDate: this.state.targetDate,
            MinimumIndividualAmount:this.state.minimumIndividualAmount,
            DebitAccount: this.state.selectedAccount,
            Purpose: this.state.groupPurpose, 
        }
        // console.log(data)
        // return;
        this.props.dispatch(actions.groupSavingsTargetGoal(this.state.user.token, data));
    }

    InitialPropertyCheck = () => {
       if(this.props.groupDetails != undefined){
           this.setState({groupName: this.props.groupDetails.response.name});
           this.setState({targetAmount: this.props.groupDetails.response.targetAmount});
           ///this.setState({targetDate: this.props.groupDetails.response.targetDate});
           this.setState({minimumIndividualAmount: this.props.groupDetails.response.minimumIndividualAmount});
           this.setState({selectedAccount: this.props.groupDetails.response.debitAccount});
           this.setState({groupPurpose: this.props.groupDetails.response.purpose});
       }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // console.log("handleSubmit was triggered");

        if(parseFloat(this.state.targetAmount.replace(/,/g, ''))<= parseFloat(this.state.minimumIndividualAmount.replace(/,/g, ''))){
           
            this.setState({invalidMiniMumAmount: true})
            return false
        }else{
            this.setState({invalidMiniMumAmount: false})
        }

        if( this.checkTheSelectedAccount()||this.checkTheEndDate()||this.checkGroupPurpose()||this.checkGroupName()||this.checkTheTargetAmount()){
        // if(this.checkMinimumAccountToContribute() || this.checkTheSelectedAccount()||this.checkTheEndDate()||this.checkGroupPurpose()||this.checkGroupName()||this.checkTheTargetAmount()){
            // console.log(this.checkMinimumAccountToContribute())
        } 
        //this.SubmitTargetGoal();
        // console.log('did the code ever got here')
        // console.log(this.state)
        switch(this.checkingUserInputs()){
            case null:
            //    console.log('empty feild found');
               break;
            case "valid":
                this.SubmitTargetGoal();
                // console.log("no empty feilds found")
                break;
        }
    }

    NavigateToGroupSavings = () => {
        history.push('/savings/activityDashBoard');
        
    }


    render() {
        const {targetDate, 
                theGroupName, 
                Purpose, 
                howMuchValidity, 
                GroupEndDate, 
                AmountToContribute, 
                NoAccountSelectionWasDon, 
                selectedAccount, invalidMiniMumAmount} = this.state;
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
                             
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                       <h4 className="m-b-10 center-text hd-underline">Create a Target Goal</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className={theGroupName ? "form-group form-error" : "form-group"}>
                                                    
                                                       <label>Give your group a name</label>
                                                       <input type="text" className="form-control" onChange={this.SetName} placeholder="e.g Dubai Trip"/>
                                                   
                                                </div>
                                                <div className="form-row">
                                                    <div className={Purpose ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">What is the purpose of this group?</label>
                                                        <input type="text" className="form-control" onChange={this.SetPurpose} placeholder="E.g. Raise Money"/>
                                                    </div>
                                                    <div className={howMuchValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">How much is the group raising?</label>
                                                    <input className="form-control" style={{ height: '40px'}} value={numberWithCommas(this.state.targetAmount)} onChange={this.SetTargetAmount} placeholder="e.g 100, 000"/>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className={GroupEndDate ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">when does the group want to meet this goal</label>
                                                        <DatePicker className="form-control" selected={targetDate} 
                                                        placeholder="June 31, 2019"
                                                        dateFormat=" MMMM d, yyyy"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        onChange={this.SetStartDate}
                                                        placeholderText="Target Date"
                                                        dropdownMode="select"
                                                        minDate={new Date()}
                                                        />
                                                       
                                                    </div>
                                                    <div className={AmountToContribute ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text" style={{height:'40px'}}>Amount to contribute per person (optional)</label>
                                                    <input value={numberWithCommas(this.state.minimumIndividualAmount)} className="form-control" onChange={this.SetAmountToContributeIndividually} placeholder="e.g. 100,000"/>
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
                                                            {
                                                                invalidMiniMumAmount===true &&
                                                                <div className="info-label error">Minimum individual amount must be less than target amount</div>
                                                            }
                                                            
                                                        <button
                                                             className="btn-alat" 
                                                             id="subButtonGroupT" 
                                                             disabled ={this.props.data.isrequesting}
                                                             type="submit">
                                                            {this.props.data.message === GROUPSAVINGSCONSTANT.CREATEGROUPSAINGSPENDING ? "Processing..." :"Create Target Goal"}

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
}

function mapStateToProps(state){
    return {
        data: state.groupSavings,
        alert:state.alert,
        groupDetails: state.groupDetails.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data
    }
}
export default connect(mapStateToProps)(CreateATargetGoal);







































