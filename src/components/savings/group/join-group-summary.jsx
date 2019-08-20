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
import {GROUPSAVINGSCONSTANT} from "../../../redux/constants/savings/group/index";
import {history} from '../../../_helpers/history';
import { Description } from './component';

if(window.performance.navigation.type == 1)
    window.location.replace("http://localhost:8080/");

class JoinGroupSummary extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            user: JSON.parse(localStorage.getItem("user")),
            isAccountInvalid: null,
            selectedAccount: null,
            
            minimumIndividualAmount: null,
            targetDate: null,
            GroupEndDate: false,
            AmountToContribute: false,
            NoAccountSelectionWasDon: false,
            edit: false
        }
        
    }

    componentDidMount = () => {
        this.InitialPropertyCheck();
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
        let result = "valid";
        for(var x in this.state){
            switch(x){
                case 'minimumIndividualAmount':
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

    SetAmountToContributeIndividually = (event) => {
        this.setState({minimumIndividualAmount: event.target.value});
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

    JoinAGroup = () => {
       const data = {
           referralCode: this.props.refferalCode,
           DebitAccount: this.state.selectedAccount
       }
       console.log(data);
       return;
       this.props.dispatch(actions.joinAGroup(this.state.user.token, data));
    }

    InitialPropertyCheck = () => {
       if(this.props.groupDetails != undefined){
           this.setState({minimumIndividualAmount: this.props.groupDetails.response.minimumIndividualAmount});
           this.setState({selectedAccount: this.props.groupDetails.response.debitAccount});
       }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("handleSubmit was triggered");
        if(this.checkTheSelectedAccount() == true){
            console.log(this.checkMinimumAccountToContribute())
        } 
        
        this.JoinAGroup();
        switch(this.checkingUserInputs()){
            case null:
               console.log('empty feild found');
               break;
            case "valid":
                this.JoinAGroup();
                console.log("no empty feilds found")
                break;
        }
    }

    handleDecline = () => {
        this.setState({NoAccountSelectionWasDon: true});
        history.push('/savings/activityDashBoard');
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
        const {NoAccountSelectionWasDon, selectedAccount} = this.state;
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
                                            <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                        {/* </NavLink> */}
                                            <li><a href="#">Investments</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* {this.props.alert && this.props.alert.message &&
                            <div style={{width: "100%"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            } */}
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                       <h4 className="m-b-10 center-text hd-underline">Join Group</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-row">
                                                   <Description 
                                                    leftHeader="MackBook"
                                                    leftDescription="Group Name"
                                                    rightHeader="12th May"
                                                    rightDiscription="Group Target"
                                                    />
                                                </div>
                                                <div className="form-row forInputFields">
                                    
                                                    <div className="form-group col-md-6 forReadOnlyInput">
                                                        <label className="label-text">Monthly Contributions</label>
                                                        <input type="Number" className="form-control"  placeholder="Totally Up to you" readOnly/>
                                                    </div>

                                                    <div className="form-group col-md-6 forReadOnlyInput">
                                                        <label className="label-text">Target Date</label>
                                                        <input type="Number" className="form-control"  placeholder="Totally Up to you" readOnly/>
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
                                                <div className="form-row buttomButtonsJoinGroup acceptAndDecline">
                                                     <div className="col-sm-6 left">
                                                         <button onClick={this.handleDecline}>Decline</button>
                                                     </div>
                                                     <div className="col-sm-6 right">
                                                         <button type="submit" id='acepting'>Accept</button>
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
        refferalCode: state.refferalCode.data
    }
}
export default connect(mapStateToProps)(JoinGroupSummary);







































