import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '../container';
import {NavLink, Route} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';

class JoinAGroup extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            user: JSON.parse(localStorage.getItem("user")),
            referralCode: null,
            debitAccount: null,

            isSubmitted: null,
            isAccountInvalid: null,
            accountNumber: null,
            selectedAccount: null,
        }
    }

    handleSelectDebitableAccounts = (account) => {
        console.log('dss', account);
        this.setState({ selectedAccount: account });
        if (this.state.isSubmitted) { 
            if(account.length == 10)
            this.setState({ isAccountInvalid: false })
         }
    }
    
    checkAccountNumber = () => {
        if (this.state.selectedAccount.length != 10) {
            this.setState({ isAccountInvalid: true })
            return true;
        }
    }

    handleReferralCode = (event) => {
        this.setState({
            referralCode: event.target.value
        })
    }

    JoinAGroup = () => {
       const data = {
           referralCode: this.state.referralCode,
           DebitAccount: this.state.selectedAccount
       }
       console.log(data)
       return;
       this.props.dispatch(actions.joinAGroup(this.state.user.token, data))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.JoinAGroup();
        return null;
    }

    render() {
        const {selectedAccount} = this.state;
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
                                        <NavLink to='/savings/goal/group-savings-selection'>
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
                                       <h4 className="m-b-10 center-text hd-underline">Join A Group</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group instruction">
                                                    <h6></h6>
                                                </div>
                                                <div className='form-row'>
                                                    <div className='form-group col-md-12 joinGroup'>
                                                        <h6>Enter Group Code</h6>
                                                        <input type="text" placeholder='GPEFA34UE' id='enterCode' onChange={this.handleReferralCode}/>
                                                    </div>
                                                </div>
                                                <div className="accountSelection">
                                                    <div className='col-sm-12'>
                                                                
                                                                    <SelectDebitableAccounts
                                                                    
                                                                        accountInvalid={this.state.isAccountInvalid}
                                                                        onChange={this.handleSelectDebitableAccounts}
                                                                        labelText="Select Account to debit" 
                                                                        options={selectedAccount}/>
                                                                
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                   
                                                    <div className="form-group col-md-12 butLeft joinButton">
                                                       <center>
                                                           <NavLink to='/savings/group/joingroup-success-message'>
                                                               <button>Proceed To Group</button>
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

export default connect(mapStateToProps)(JoinAGroup);
