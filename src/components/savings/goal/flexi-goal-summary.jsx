import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import SavingsContainer from '../container';
import InnerContainer from '../../../shared/templates/inner-container';
import { Input } from '../../airtime-bills/data/input';
import { Select } from '../../airtime-bills/data/input';
import savingsPlanSummary from '../../../shared/components/savingsPlanSummary';

class FlexiGoalSummary extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        key: null
      }
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
                       <div className='goalSummaryCover'>
                               <div className="goalSummaryHeading">
                                 <h5>Goal Summary</h5>
                               </div>
                               <div>
                                  <p>{console.log(this.props.flexiGoal)}</p>
                                  <button>Create Goal</button>
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
      frequencyAndAccount: state.flexiGoalCreationSaving,
      flexiGoal: state.flexiSavingGoal
   }
}

export default connect(mapStateToProps, null)(FlexiGoalSummary);
