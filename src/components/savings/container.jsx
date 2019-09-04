import * as React from "react";
import {Fragment} from "react";
import { Route, NavLink } from "react-router-dom";
import ChooseGoalPlan from '../savings/goal/goal-plan';




class SavingsContainer extends React.Component {
    render() {
        // console.log(this.props);
        return (
            <Fragment>
                <div className="dashboard-wrapper">
                    <div className="container">
                        {this.props.children}
                        
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default SavingsContainer;