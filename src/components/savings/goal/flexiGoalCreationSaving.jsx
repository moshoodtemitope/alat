import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {NavLink, Route} from "react-router-dom";
import SavingsContainer from '../container';
import InnerContainer from '../../../shared/templates/inner-container';
import { Input } from '../../airtime-bills/data/input';
import { Select } from '../../airtime-bills/data/input';
import flexiGoalSavingPlan from '../../../redux/actions/savings/goal/flexiGoalCreationSaving';
import  {SelectAcount}  from '../../airtime-bills/airtime/selectAccount';
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';

class FlexiGoalCreationSav extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        value: [
          {account: '019098899'}
        ],
        selectedAccount: null,
        frequency: [     {value: 'daily', displayValue: 'daily'},
                         {value: 'weekly', displayValue: 'weekly'},
                         {value: 'monthly', displayValue: 'monthly'},
                       ],
      }
    }

    handleChange = (event) => {
      this.setState({
         selectedAccount: event.target.value
      });
    }

    handleFrequency = (event) => {
      this.setState({
        setFrequency: event.target.value
      });
    }

    validateAndSubmit = () => {
       console.log(this.state);
       if(this.state.setFrequency == null)
         return;
       this.props.flexiGoalS({
         type: 'flexiGoalCreationSaving',
         payload: { selectedAccount: this.state.selectedAccount,
                    frequency: this.state.setFrequency
                  }
       });
    }

    render() {
       return(
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
                                           <li><a href="accounts.html" className="active">Goals</a></li>
                                           <li><a href="statement.html">Group Savings</a></li>
                                           <li><a href="#">Investments</a></li>
                                       </ul>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className='row flexiFrequencyAmount'>
                          <div className='col-sm-6 left'>

                          </div>
                          <div className='col-sm-6 right'>
                            <label>You will have to save</label>
                            <div className='amountSaving'>
                                <div className='left'>
                                   <input type="text" placeholder='50' readOnly/>
                                </div>
                                <div className='right'>
                                   <button>{this.props.frequency}</button>
                                </div>
                            </div>
                            <Select optionsList={this.state.value} changed={this.handleChange}/>
                              <SelectDebitableAccounts
                                  value={this.state.accountNumber}
                                  accountInvalid={this.state.isAccountInvalid}
                                  onChange={this.handleSelectDebitableAccounts}
                                  labelText={"Select an account to debit"}/>

                            <NavLink to="/savings/goals/flexiGoalSummary">
                                <button onClick={this.validateAndSubmit}>Save Goal</button>
                            </NavLink>
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
     goalData: state.flexiSavingGoal,
     amount: state.flexiSavingGoal.amountToSave,
     frequency: state.flexiSavingGoal.savingCircle
  }
}

function matchDispatchToState(dispatch){
   return bindActionCreators({
     flexiGoalS: flexiGoalSavingPlan
   }, dispatch)
}

export default connect(null, matchDispatchToState)(FlexiGoalCreationSav)
