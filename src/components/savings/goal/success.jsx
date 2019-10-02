import * as React from "react";
import {Fragment} from "react";
import successLogo from '../../../assets/img/success.svg';
import {NavLink, Route, Redirect} from "react-router-dom";
import Members from '../group/list-item';
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/goal/create-stash-goal.actions'
import {createGoalConstants} from '../../../redux/constants/goal/create-stash.constant'


class SuccessMessage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            targetAmount:"",
        
        }
    }
    componentDidMount(){
        const details = this.props.location.state.name;
        this.setState({
            create_stash_goal: details,

        });

    }
   

    render() {
        const details =this.props.location.state.details;
        console.log("===================",details);

        return (
            <Fragment>
                        <div className="row">
                            <div className="col-sm-12">
                                <p className="page-title">Savings & Goals</p>
                            </div>
                            <div className="col-sm-12">
                                <div className="tab-overflow">
                                    <div className="sub-tab-nav">
                                        <ul>
                                        <NavLink to='/savings/choose-goal-plan'>
                                            <li><a className="active">Goals</a></li>
                                        </NavLink>
                                        <NavLink to="/savings/activityDashBoard">
                                            <li><a>Group Savings</a></li>
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

                                            <form>
                                                <div className="form-group">
                                                    <center>
                                                    <img className="successIcon"    alt="" src={successLogo}/>
                                                    </center>
                                                    <label id="sucMessage">{details.goalTypeName} goal created successfully</label>
                                                </div>
                                                <div className="form-row">
                                                <Members 
                                                   userType="admin"
                                                   name={details.goalTypeName}
                                                   position="Status: Completed"
                                                    amount={"₦"+details.amountSaved}
                                                   intent="Amount Saved"
                                                   id="autoSummary"/>
                                                </div>
                                            </form>
                                       </div>


                                      </div>
                                        <center>
                                            <a onClick={() => { this.props.dispatch(actions.ClearAction(createGoalConstants.STASH_GOAL_REDUCER_CLEAR));
                                                this.props.history.push('/savings/choose-goal-plan') }} className="add-bene m-t-50">Go to Dashboard</a>
                                        </center>


                                    </div>
                                </div>

                            </div>

                        </div>

            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    create_stash_goal:state.CustomerGoalReducerPile.create_stash_goal,
    create_stash_goal_step1:state.CustomerGoalReducerPile.create_stash_step1
});
export default connect(mapStateToProps)(SuccessMessage);
