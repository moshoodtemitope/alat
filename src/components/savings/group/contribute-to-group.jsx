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
import {history} from '../../../_helpers/history';

class ContributeToGroup extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            amount: null,
            selectedAccount: null,
            amountValidity: false,
            isAccountInvalid: false
        }
    }

    handleSelectDebitableAccounts = (account) => {
        console.log('dss', account);
        this.setState({ selectedAccount: account });
    }
    
    checkAccountNumber = () => {
        if (this.state.selectedAccount.length != 10) {
            this.setState({ isAccountInvalid: true })
        }else{
            this.setState({isAccountInvalid: false});
        }
    }

    checkingUserInputs = () => {
        let result = "valid";
        for(var x in this.state){
            switch(x){
                case 'selectedAccount':
                   if(this.state[x] == null || this.state[x] == ""){
                      console.log(x)
                      result = null;
                      break;
                   }     
                case 'amount':
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


    validateAccount = () => {
        if(this.state.status != "Yes"){
            this.setState({confirmDelete: true});
        }else{
            this.setState({confirmDelete: false});
        }
    }

    validateAmount = () => {
        if(this.state.amount == null || this.state.amount == ""){
            this.setState({amountValidity: true});
        }else{
            this.setState({amountValidity: false});
        }
    }

    GoBackToGroupAnalytics = () => {
        history.push('/savings/group/group-analytics');
    }

    ContributeToGroup = () => {
        let id = this.props.groupDetails.response.id;
        let data = {
            groupId: parseInt(id),
            amount: this.state.amount,
            debitAccount: this.state.selectedAccount
        };

        console.log(data);
        return;
        this.props.dispatch(actions.deleteGroup(this.state.user.token, data));
    }

    SubmitForm = (event) => {
        event.preventDefault();
        this.validateForm();

        if(this.state.status == "Yes")
             this.DeleteTheGroup();
    }

    SetAmountInput = (event) => {
        this.setState({amount: event.target.value});
    }
    
    render() {
        const { selectedAccount, isAccountInvalid} = this.state;
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
                                       <h4 className="m-b-10 center-text hd-underline">Confirm Delete!</h4>

                                            <form>
                                                <div className="form-row">
                                                    <div className={amountValidity ? "form-group form-error col-md-11" : "form-group col-md-11"}>
                                                        <label className="label-text">Are you sure you want to delete this group?</label>
                                                        <input placeholder="N100, 000" onChange={this.SetAmountInput()}/>
                                                   </div>
                                                </div>

                                                <div className="form-row">
                                                    <div className={isAccountInvalid ? "form-group form-error col-md-11" : "form-group col-md-11"}>
                                                    
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

                                                        <button type="submit" onClick={this.GoBackToGroupAnalytics} className="btn-alat m-t-10 m-b-20 text-center goBackButMini">Go Back</button>
                                                            <button type="submit" onClick={this.SubmitForm} className="btn-alat m-t-10 m-b-20 text-center">Proceed</button>
                                                            
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
        createGroupSavings: state.createRotatingGroupSavings.data,
        rotatingGroupDetails: state.rotatingGroupDetails.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        groupDetails: state.groupDetails.data
    }
}
export default connect(mapStateToProps)(ContributeToGroup);
