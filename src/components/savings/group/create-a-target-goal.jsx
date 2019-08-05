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
            targetAmount: null,
            minimumIndividualAmount: null,
            targetDate: null,

            howMuchValidity: false,
            GroupEndDate: false,
            AmountToContribute: false,
            NoAccountSelectionWasDon: false,
            theGroupName: false,
            Purpose: false
        }
         
        this.checkingUserInputs = this.checkingUserInputs.bind(this);
        this.handleSelectDebitableAccounts = this.handleSelectDebitableAccounts.bind(this);
        this.checkAccountNumber = this.checkAccountNumber.bind(this);
        this.checkMinimumAccountToContribute = this.checkMinimumAccountToContribute.bind(this);
        this.checkTheSelectedAccount = this.checkTheSelectedAccount.bind(this);
        this.checkTheEndDate = this.checkTheEndDate.bind(this);
        this.checkTheTargetAmount = this.checkTheTargetAmount.bind(this);
        this.checkGroupPurpose = this.checkGroupPurpose.bind(this);
        this.SubmitTargetGoal = this.SubmitTargetGoal.bind(this);
    }

    handleSelectDebitableAccounts = (account) => {
        console.log('dss', account);
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
                      console.log(x)
                      result = null;
                      break;
                   }     
                case 'groupPurpose':
                   if(this.state[x] == null || this.state[x] == ""){
                       console.log(x)
                       result = null;
                       break;
                   }
                case 'targetAmount':
                   if(this.state[x] == null || this.state[x] == ""){
                      console.log(x)
                      result = null;
                      break;
                   }
                case 'minimumIndividualAmount':
                   if(this.state[x] == null || this.state[x] == ""){
                      console.log(x)
                      result = null;
                      break;
                   }
                case 'targetDate':
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

    SetName = (event) => {
        this.setState({groupName: event.target.value})
    }

    SetTargetAmount = (event) => {
        this.setState({targetAmount: event.target.value})
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
        this.setState({minimumIndividualAmount: event.target.value});
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
        console.log(this.state.minimumIndividualAmount);
        if(this.state.minimumIndividualAmount == null || this.state.minimumIndividualAmount == ""){
            this.setState({AmountToContribute: true});
            return false;
        }else{
            this.setState({AmountToContribute: false})
            return true;
        }
     }

    SubmitTargetGoal = () => {
        const data = {
            name:this.state.groupName,
            targetAmount: this.state.targetAmount,
            targetDate: this.state.startDate,
            minimumIndividualAmount: this.state.minimumIndividualAmount,
            debitAccount: this.state.selectedAccount,
            purpose: this.state.groupPurpose,
            
           
        }
        console.log(data)

        this.props.dispatch(actions.groupSavingsTargetGoal(this.state.user.token, data));
    }


    handleSubmit = (event) => {
         event.preventDefault();
        //console.log("handleSubmit was triggered");
        // if(this.checkMinimumAccountToContribute() || this.checkTheSelectedAccount()||this.checkTheEndDate()||this.checkGroupPurpose()||this.checkGroupName()||this.checkTheTargetAmount()){
        //     console.log(this.checkMinimumAccountToContribute())
        // }
        // this.SubmitTargetGoal();
        // console.log('did the code ever got here')
        // console.log(this.state)
        // switch(this.checkingUserInputs()){
        //     case null:
        //        console.log('empty feild found');
        //        break;
        //     case "valid":
        //         // this.SubmitTargetGoal();
        //         console.log("no empty feilds found")
        //         break;
        // }

    }

    render() {
        const {targetDate, theGroupName, Purpose, howMuchValidity, GroupEndDate, AmountToContribute, NoAccountSelectionWasDon, selectedAccount} = this.state;
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
                                            <li><a className="active">Group Savings</a></li>
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
                                       <h4 className="m-b-10 center-text hd-underline">Create a Target Goal</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className={theGroupName ? "form-group form-error" : "form-group"}>
                                                    
                                                       <label>Give your group a name</label>
                                                       <input type="text" className="form-control" onChange={this.SetName} placeholder="Dubai Goal"/>
                                                   
                                                </div>
                                                <div className="form-row">
                                                    <div className={Purpose ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">What is the purpose of this group?</label>
                                                        <input type="text" className="form-control" onChange={this.SetPurpose} placeholder="Raise Money"/>
                                                    </div>
                                                    <div className={howMuchValidity ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">How much is the group raising?</label>
                                                        <input type="Number" className="form-control" onChange={this.SetTargetAmount} placeholder="N100, 0000"/>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className={GroupEndDate ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">when does the group want to meet this goal</label>
                                                        <DatePicker className="form-control" selected={targetDate} 
                                                        placeholder="October 31, 2017"
                                                        dateFormat=" MMMM d, yyyy"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        onChange={this.SetStartDate}
                                                        dropdownMode="select"
                                                        maxDate={new Date()}
                                                        />
                                                       
                                                    </div>
                                                    <div className={AmountToContribute ? "form-group form-error col-md-6" : "form-group col-md-6"}>
                                                        <label className="label-text">Amount to contribute per person (optional)</label>
                                                        <input type="Number" className="form-control" onChange={this.SetAmountToContributeIndividually} placeholder="E.g. ₦100,000"/>
                                                    </div>
                                                </div>
                                                
                                                <div className={NoAccountSelectionWasDon ? "form-error" : "accountSelection"}>
                                                    <div className='col-sm-12'>
                                                                <center>
                                                                    <SelectDebitableAccounts
                                                                        options={selectedAccount}
                                                                        // value={this.state.selectedAccount}
                                                                        accountInvalid={this.state.isAccountInvalid}
                                                                        onChange={this.handleSelectDebitableAccounts}
                                                                        options={selectedAccount}
                                                                        labelText="Select Account to debit" />
                                                                </center>
                                                    </div>
                                                </div>
                                                
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <NavLink to='/savings/group/group-created'>
                                                                  <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Next</button>
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
        data: state.groupSavings
    }
}
export default connect(mapStateToProps)(CreateATargetGoal);







































