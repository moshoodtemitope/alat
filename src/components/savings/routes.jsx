import * as React from "react";
import {Redirect, Route, Router, Switch} from "react-router";
import {connect} from "react-redux";
import {Fragment} from "react";
import CreateAFlexiGoal from "./goal/flexi-goal";
import FlexiGoalSummary from "./goal/flexi-goal-summary";
import FlexiGoalCreationSav from "./goal/flexiGoalCreationSaving";

class SavingRoute extends React.Component{
   render(){
      return(
        <div>
            <Route path="/savings/goals/flexigoalCreation" component={CreateAFlexiGoal} />
            <Route path="/savings/goals/flexiGoalSummary" component={FlexiGoalSummary} />
            <Route path="/savings/goals/flexiGoalContinue" component={FlexiGoalCreationSav} />
        </div>
      )
   }
}

export default SavingRoute;
