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

class AutomateGroupSavings extends React.Component {
    constructor(props){
        super(props);
        this.state={
            endDate:null,
            stdInvalid:false,
            edtInvalid:false,
            isSubmitted: null,
            endDateInvalid:false,
            isAccountInvalid: null,
            accountNumber: null,
            selectedAccount: null
        }
    }

    validateEndDate=()=>{
        if(this.state.endDate == null){
            this.setState({endDateInvalid: true});
            return true;
        }
            else {this.setState({endDateInvalid : false});
        return false;
        }
    }

    handleSelectDebitableAccounts(account) {
        console.log('dss', account);
        this.setState({ selectedAccount: account })
        if (this.state.isSubmitted) { 
            if(account.length == 10)
            this.setState({ isAccountInvalid: false })
         }
    }
    
    checkAccountNumber() {
        if (this.state.selectedAccount.length != 10) {
            this.setState({ isAccountInvalid: true })
            return true;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('what');
    }


    render() {
        const {endDate,endDateInvalid} = this.state;

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
                                            <li><a href="#">Group Savings</a></li>
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
                                       <h4 className="m-b-10 center-text hd-underline">Automate Group Savings</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label className="label-text">How would you like to save?</label>
                                                        <input type="text" className="form-control"  placeholder="Raise Money"/>
                                                    </div>
                                                    <div className="form-group col-md-6">
                                            
                                                        <label className="label-text">the group target date is?</label>
                                                        <DatePicker className="form-control" selected={endDate}
                                                        placeholder="October 31, 2017"
                                                        dateFormat=" MMMM d, yyyy"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        maxDate={new Date()}
                                                        />
                                                        {endDateInvalid &&
                                                            <div className="text-danger">select a valid date</div>}
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label className="label-text">when should we start taking the money</label>
                                                        <DatePicker className="form-control" selected={endDate}
                                                        placeholder="October 31, 2017"
                                                        dateFormat=" MMMM d, yyyy"
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        maxDate={new Date()}
                                                        />
                                                        {endDateInvalid &&
                                                            <div className="text-danger">select a valid date</div>}
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label className="label-text">how much should we take from your account?</label>
                                                        <input type="text" className="form-control"  placeholder="E.g. ₦100,000"/>
                                                    </div>
                                                </div>
                                                
                                                <div className="accountSelection">
                                                    <div className='col-sm-12'>
                                                                <center>
                                                                    <SelectDebitableAccounts
                                                                        value={this.state.accountNumber}
                                                                        accountInvalid={this.state.isAccountInvalid}
                                                                        onChange={this.handleSelectDebitableAccounts}
                                                                        labelText="Select Account to debit" />
                                                                </center>
                                                    </div>
                                                </div>
                                                
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>
                                                            <NavLink to='/savings/group/success-message'>
                                                                  <button type="submit" className="btn-alat m-t-10 m-b-20 text-center">Accept</button>
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

    }
}
export default connect(null, mapStateToProps)(AutomateGroupSavings);
