import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '..';
import {NavLink} from "react-router-dom";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as action from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import {history} from '../../../_helpers/history';
import { Description } from './component';
import moment from "moment";

class JoinGroupSummary extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            user: JSON.parse(localStorage.getItem("user")),
            isAccountInvalid: null,
            selectedAccount: null,
            NoAccountSelectionWasDon: false
        }
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
        let result = 'valid';
        let account = this.state.selectedAccount;
        if(account == null || account == "")
            result = null;

        console.log(result);  
        return result;  
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
           referralCode: this.props.refferalCode.data,
           debitAccount: this.state.selectedAccount
       }
       console.log(data);
       if(this.props.findGroup.response.esusuData != null)
            this.props.dispatch(action.joinGroupEsusu(this.state.user.token, data));
       if(this.props.findGroup.response.groupData != null)
            this.props.dispatch(actions.joinGroup(this.state.user.token, data));
       //return;
       //this.props.dispatch(actions.joinGroup(this.state.user.token, data));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.checkTheSelectedAccount();
            
        switch(this.checkingUserInputs()){
            case null:
               console.log('empty feild found');
               break;
            case "valid":
                this.JoinAGroup();
               console.log("no empty feilds found")
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
        const {NoAccountSelectionWasDon, selectedAccount} = this.state;
        if(this.props.findGroup.response.groupData != null && this.props.findGroup.response.esusuData == null){
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                            {/* </NavLink> */}
                                                <li><a href="#">Investments</a></li>
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
                                           <h4 className="m-b-10 center-text hd-underline">Join Group</h4>
    
                                                <form onSubmit={this.handleSubmit}>
                                                    <div className="form-row">
                                                       <Description 
                                                        leftHeader={this.props.findGroup.response.groupData.name}
                                                        leftDescription="Group Name"
                                                        rightHeader={this.props.findGroup.response.groupData.targetAmount}
                                                        rightDiscription="Group Target"
                                                        />
                                                    </div>
                                                    <div className="form-row forInputFields">
                                        
                                                        <div className="form-group col-md-6 forReadOnlyInput">
                                                            <label className="label-text">Monthly Contributions</label>
                                                            <input type="Number" className="form-control"  placeholder={this.props.findGroup.response.groupData.mininumIndividualAmount} readOnly/>
                                                        </div>
    
                                                        <div className="form-group col-md-6 forReadOnlyInput">
                                                            <label className="label-text">Target Date</label>
                                                            <input type="Number" className="form-control"  placeholder={moment(this.props.findGroup.response.groupData.targetDate).format('DD/MM/YYYY')} readOnly/>
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
    
                </Fragment>
            );
        }
       
        if(this.props.findGroup.response.groupData == null && this.props.findGroup.response.esusuData != null){
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
                                                        leftHeader={this.props.findGroup.response.esusuData.name}
                                                        leftDescription="Group Name"
                                                        rightHeader={this.props.findGroup.response.esusuData.memberCount}
                                                        rightDiscription="Member Count"
                                                        />
                                                    </div>
                                                    <div className="form-row forInputFields">
                                        
                                                        <div className="form-group col-md-6 forReadOnlyInput">
                                                            <label className="label-text">Monthly Contributions</label>
                                                            <input type="Number" className="form-control"  placeholder={this.props.findGroup.response.esusuData.monthlyContribution} readOnly/>
                                                        </div>
    
                                                        <div className="form-group col-md-6 forReadOnlyInput">
                                                            <label className="label-text">Start Date</label>
                                                            <input type="Number" className="form-control"  placeholder={moment(this.props.findGroup.response.esusuData.startDate).format('DD/MM/YYYY')} readOnly/>
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
    
                </Fragment>
            );
        }
    }
}

function mapStateToProps(state){
    return {
        refferalCode: state.refferalCode.data,
        findGroup: state.findGroup.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        alert:state.alert,

    }
}
export default connect(mapStateToProps)(JoinGroupSummary);







































