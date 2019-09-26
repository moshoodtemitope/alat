import * as React from "react";
import { connect } from "react-redux";
// import {history} from "../_helpers";
import {Router} from "react-router";
// import {getGoalsSummary} from "./actions";
import {NavLink, Redirect} from "react-router-dom";
import {Fragment} from "react";
import {getGoalsSummary} from "../../redux/actions/dashboard/dashboard.actions";
import savemoney from "../../assets/img/save-money.svg";

class UserGoals extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user"))
        };
        this.fetchuserGoals();
    }

    fetchuserGoals(){
        const { dispatch } = this.props;
        dispatch(getGoalsSummary(this.state.user.token));
    };

    componentDidMount() {

    }

    renderGoalsElement(userGoals){
        if(!userGoals){
            return(
                <div className="goal-intro">
                    <img src={savemoney} />
                    <h3>Start saving, earn <span
                        className="red-text">10%</span> interest</h3>
                    <p>Create goals to meet your targets and earn interest while doing
                        so.</p>
                    <a href="" className="btn-alat m-b-10 m-t-20">Discover More</a>
                </div>
            );
        }
        //
        else{
            if(userGoals.user_goals === 'DASHBOARD_GOALS_SUMMARY_FETCH_PENDING'){
                return(
                    <h4 className="text-center" style={{ marginTop: '65px'}}>Loading goals summary...</h4>
                );
            }
            else if(userGoals.user_goals === 'DASHBOARD_GOALS_SUMMARY_FETCH_SUCCESS'){
                let goals = userGoals.user_goals_data.response;
                if(goals.length == 0){
                    return(
                        <div className="goal-intro">
                            <img src={savemoney} />
                            <h3>Start saving, earn <span
                                className="red-text">10%</span> interest</h3>
                            <p>Create goals to meet your targtes and earn interest while doing
                                so.</p>
                            <NavLink to="/savings/choose-goal-plan">

                            <a href="" className="btn-alat m-b-10 m-t-20">Discover More</a>
                            </NavLink>
                        </div>
                    );
                }
                let achieved = 0;
                let totalPercentage = 0;
                let rounded = 0;
                let classname = "progress-circle p";
                for(let result of goals){
                    totalPercentage += result.percentageCompleted;
                    if(totalPercentage == 0){
                        achieved = 0;
                    }
                }
                achieved = totalPercentage/goals.length;
                rounded = Math.round( achieved * 10 ) / 10;
                classname = classname + achieved.toFixed();
                return(
                    // user has goals
                    <div className="active-goal">
                        <div className={classname}>
                            <span>{rounded}%</span>
                            <div className="left-half-clipper">
                                <div className="first50-bar"></div>
                                <div className="value-bar"></div>
                            </div>
                        </div>
                        <p className="">{goals.length} Active Goals</p>
                        <NavLink to="/savings/choose-goal-plan">
                        <a href="#" className="btn-alat border-btn btn-sm">View all goals</a>
                        </NavLink>
                    </div>
                );
            }
            else if(userGoals.user_goals === 'DASHBOARD_GOALS_SUMMARY_FETCH_FAILURE'){
                return (
                    <div>
                        <h4>{userGoals.user_goals_data.error}</h4>
                        <button onClick={this.fetchuserGoals.bind(this)}>Retry</button>
                    </div>
                )
            }
            else{
                return(
                    <div className="goal-intro">
                        <img src={savemoney} />
                        <h3>Start saving, earn <span
                            className="red-text">10%</span> interest</h3>
                        <p>Create goals to meet your targtes and earn interest while doing
                            so.</p>
                        <a href="" className="btn-alat m-b-10 m-t-20">Discover More</a>
                    </div>
                );
            }
        }
    }

    render(){
        let usergoals = this.props.userGoals;
        return (
            <Fragment>
                <div className="col-sm-12 col-md-6">
                    <div className="al-card acct-match">
                        {this.renderGoalsElement(usergoals)}
                    </div>
                </div>
            </Fragment>

        );
    }
}

function mapStateToProps(state){
    return {
        userGoals: state.dashboard_userGoals
    };
}

export default connect(mapStateToProps)(UserGoals);