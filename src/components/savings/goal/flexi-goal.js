import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {NavLink, Route, Redirect} from "react-router-dom";
import DatePicker from 'react-datepicker';
import SavingsContainer from '../container';
import InnerContainer from '../../../shared/templates/inner-container';
import { Input } from '../../airtime-bills/data/input';
import { Select } from '../../airtime-bills/data/input';
import {days, weeks, months} from '../../../shared/components/timeCalculator';
import flexiGoalSavingPlan from '../../../redux/actions/savings/goal/flexiGoalCreation';

class CreateAFlexiGoal extends React.Component {
    constructor(props){
      super(props);
      this.state = {
         goalName: null,
         amountToSave: null,
         startDate: new Date(),
         endDate: new Date(),

         frequency: [     {value: 'daily', displayValue: 'daily'},
                          {value: 'weekly', displayValue: 'weekly'},
                          {value: 'monthly', displayValue: 'monthly'},
                          ],
         freq: null,
         averageAmount: null
      }

      this.handleClick = this.handleClick.bind(this);
      this.handleGoalName = this.handleGoalName.bind(this);
      this.handleHowMuchToSave = this.handleHowMuchToSave.bind(this);
      this.handleSavingCircle = this.handleSavingCircle.bind(this);
      this.setStartDate = this.setStartDate.bind(this);
      this.amountNeededToBeSaved = this.amountNeededToBeSaved.bind(this);
      this.computeAverageAmount = this.computeAverageAmount.bind(this);
      this.callRedirect = this.callRedirect.bind(this);
      this.PushToGlobalState = this.PushToGlobalState.bind(this);
    }

    GetDate = (event) => {
      console.log(event.target.value);
    }

    amountNeededToBeSaved(){
       console.log(this.state.startDate);
       console.log(this.state.endDate);
       switch(this.state.freq){
         case 'daily':
            return days(this.state.startDate, this.state.endDate);
         case 'weekly':
            return weeks(this.state.startDate, this.state.endDate);
         case 'monthly':
            return months(this.state.startDate, this.state.endDate);
       }
    }

    computeAverageAmount = (param) => {
       console.log(param)
       var amountToSave = this.state.amountToSave;

       this.setState({
          averageAmount: amountToSave / param
       },() => {
         console.log(this.state)
         this.PushToGlobalState();
       });
    }

    callRedirect = () => {
        this.props.history.push('/savings/goals/flexiGoalContinue')
    }

    PushToGlobalState = () => {
      var count = 0;
      console.log(this.state)
      for(const x in this.state){
         count++;
         if(this.state[x] == null){
           break;
         }

         if(Object.keys(this.state).length == count){
           this.props.flexiGoalPlan({
             type: "flexiGoalCreation",
             payload: this.state
           });
           console.log('calling Redirect')
           this.callRedirect();
           break;
         }
      }
    }

    handleClick = () => {
     const period = this.amountNeededToBeSaved();
     this.computeAverageAmount(period);
    }

    setStartDate = (event) => {
      this.setState({
        startDate: event.target.value
      });
    }

    handleHowMuchToSave = (event) => {
       this.setState({
         amountToSave: event.target.value
       })
    }

    handleGoalName = (event) => {
      this.setState({
          goalName: event.target.value
      })
    }

    handleDuration = (event) => {
      this.setState({
          endDate: event.target.value
      });

      console.log(event.target.value);
    }

    handleSavingCircle = (event) => {
      console.log(event.target.value);
      console.log('value is here');
      this.setState({
          freq: event.target.value
      })
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

                         <div className="col-sm-12">
                             <div className="row">
                                 <div className="col-sm-12">
                                     <div className="max-600">
                                         <div className="al-card no-pad">
                                           <h4>Create A fixed Goal</h4>
                                           <p>Save daily, weekly or monthly towards a target amount, earn <span>10% interest p.a. No withdrawal Allowed and you will lose your interest
                                             if you don't meet your target.</span></p>
                                           <label>Give Your Goal a Name!</label><br/>
                                           <Input changed={this.handleGoalName}/>
                                             <div className='flex-cre'>
                                                 <div className='left'>
                                                    <label>How much would you like to save</label><br/>
                                                    <Input changed={this.handleHowMuchToSave}/>
                                                 </div>
                                                 <div className='right'>
                                                    <label>Saving Circle</label>
                                                    <Select optionsList={this.state.frequency} changed={this.handleSavingCircle}/>
                                                 </div>
                                             </div>

                                             <div className='flex-ctn'>
                                                <div className='left'>
                                                  <label>when would you like to start</label>
                                                     <input type="date" placeholder={this.state.startDate} onChange={this.setStartDate}/>
                                                </div>
                                                <div className='right'>
                                                    <label>How long do you want to save for?</label>
                                                    <input type="date" onChange={this.handleDuration}/>
                                                </div>
                                             </div>
                                             <div className='lastSection'>
                                                 <button id='saveNextButton' onClick={this.handleClick}>Next</button>
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


function matchDispatchToState(dispatch){
  return bindActionCreators({
     flexiGoalPlan: flexiGoalSavingPlan
  }, dispatch)
}

export default connect(null, matchDispatchToState)(CreateAFlexiGoal);

//export default CreateAFlexiGoal;
