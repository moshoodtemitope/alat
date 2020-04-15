import * as React from "react";
import {Fragment} from "react";
import {NavLink} from "react-router-dom";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as action from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import {history} from '../../../_helpers/history';
import { Description } from './component';
import moment from "moment";
import { GROUPSAVINGSCONSTANT } from '../../../redux/constants/savings/group';
import { numberWithCommas } from "../../../shared/utils";



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

    componentDidMount = () => {
        // console.log(this.props.findGroup)
        if(this.props.refferalCode != undefined){
            let storage = window.localStorage;
            storage.setItem('joinReferralCode', this.props.refferalCode.data);
        }
    }

    FetchGroupData = () => {
        let storage = window.localStorage;

        const data = {
            referralCode: storage.getItem('joinReferralCode')
        }
    
        // console.log(data)
        this.props.dispatch(actions.findGroup(this.state.user.token, data))
    }

    handleDecline = () => {
        history.push('/savings/activityDashBoard');
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
        let result = 'valid';
        let account = this.state.selectedAccount;
        if(account == null || account == "")
            result = null;

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

       if(this.props.findGroup.response.esusuData != null)
            this.props.dispatch(action.joinGroupEsusu(this.state.user.token, data));
       if(this.props.findGroup.response.groupData != null)
            this.props.dispatch(actions.joinGroup(this.state.user.token, data));
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.checkTheSelectedAccount();
            
        switch(this.checkingUserInputs()){
            case null:
            //    console.log('empty feild found');
               break;
            case "valid":
                this.JoinAGroup();
            //    console.log("no empty feilds found")
        }
    }

    NavigateToGroupSavings = () => {
            history.push('/savings/activityDashBoard');
    }

    render() {
        const {NoAccountSelectionWasDon, selectedAccount} = this.state;
        
        if(this.props.findGrp.message === GROUPSAVINGSCONSTANT.FIND_GROUP){
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
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <p>Loading Data ...</p>
    
                            </div>
    
                </Fragment>
            );
        }

        if(this.props.findGrp.message === GROUPSAVINGSCONSTANT.FIND_GROUP_SUCCESS){
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
                                               <h4 className="m-b-10 center-text hd-underline">Join Group</h4>
        
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="form-row">
                                                           <Description 
                                                            leftHeader={this.props.findGroup.response.groupData.name}
                                                            leftDescription="Group Name"
                                                            rightHeader={numberWithCommas(this.props.findGroup.response.groupData.targetAmount)}
                                                            rightDiscription="Group Target"
                                                            />
                                                        </div>
                                                        <div className="form-row forInputFields">
                                            
                                                            <div className="form-group col-md-6 forReadOnlyInput">
                                                                <label className="label-text">Monthly Contributions</label>
                                                            <input type="Number" className="form-control" placeholder={numberWithCommas(this.props.findGroup.response.groupData.mininumIndividualAmount)} readOnly/>
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
                                                            <input type="Number" className="form-control" placeholder={numberWithCommas(this.props.findGroup.response.esusuData.monthlyContribution)} readOnly/>
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
                                                                 <button disabled={this.props.joinGroupEsusu.message ===GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU } type="submit" id='acepting'>
                                                                 {this.props.joinGroupEsusu.message === GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU ? "Processing...":'Accept'}
                                                                 </button>
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

        if(this.props.findGrp.message === GROUPSAVINGSCONSTANT.FIND_GROUP_ERROR){
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
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <p>{this.props.alert.message}</p>
    
                            </div>
    
                </Fragment>
            );
        }

        if(this.props.findGroup == undefined){
            this.FetchGroupData();
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
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <p>Loading Data ...</p>
    
                            </div>
    
                </Fragment>
            );
        }

        if(this.props.findGroup != undefined){
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
                                               <h4 className="m-b-10 center-text hd-underline">Join Group</h4>
        
                                                    <form onSubmit={this.handleSubmit}>
                                                        <div className="form-row">
                                                           <Description 
                                                            leftHeader={this.props.findGroup.response.groupData.name}
                                                            leftDescription="Group Name"
                                                            rightHeader={numberWithCommas(this.props.findGroup.response.groupData.targetAmount)}
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
                                                                 <button disabled={this.props.joinGroupEsusu.message ===GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU } type="submit" id='acepting'>
                                                                 {this.props.joinGroupEsusu.message === GROUPSAVINGSCONSTANT.JOIN_GROUP_ESUSU ? "Processing...":'Accept'}
                                                                 </button>
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
}

function mapStateToProps(state){
    return {
        refferalCode: state.refferalCode.data,
        findGroup: state.findGroup.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        alert:state.alert,
        joinGroupEsusu:state.joinGroupEsusu,
        findGrp: state.findGroup

    }
}
export default connect(mapStateToProps)(JoinGroupSummary);







































