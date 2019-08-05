import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Members from './list-item';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";

class SuccessMessage extends React.Component {
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

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group">
                                                    <label id="sucMessage">Scheduling was successfull</label>
                                                </div>
                                                <div className="form-row">
                                                <Members 
                                                   userType="admin"
                                                   name="Group Savings"
                                                   position="Status: running"
                                                   amount="N10, 000"
                                                   intent="Daily"
                                                   id="autoSummary"/>
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
export default connect(null, mapStateToProps)(SuccessMessage);
