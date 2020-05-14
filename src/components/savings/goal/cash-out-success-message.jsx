import * as React from "react";
import {Fragment} from "react";
import successLogo from '../../../assets/img/success.svg';
import {NavLink} from "react-router-dom";
import { connect } from "react-redux";
import {customerGoalConstants} from '../../../redux/constants/goal/get-customer-trans-history.constant';
import * as actions from '../../../redux/actions/savings/goal/get-customer-transaction-history.actions'

class CashOutGoalSuccess extends React.Component {
    constructor(props){
        super(props);
        this.state={
            targetAmount:"",

        }
    }


    render() {
        const data = this.props.location.state;
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
                                        <li>
                                        <NavLink to='/savings/choose-goal-plan'>
                                            Goals
                                            </NavLink>
                                        </li>
                                        <li>
                                        <NavLink to='/savings/activityDashBoard'>
                                            Group Savings
                                        </NavLink>
                                        </li>
                                            {/* <li><a href="#">Investments</a></li> */}

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
                                                            <img className="successIcon" alt="" src={successLogo}/>
                                                        </center>
                                                        <label className="top-goal-Message">{data.details}</label>
                                                    </div>

                                                </form>
                                            </div>
                                            <center>
                                                <a onClick={() => { this.props.dispatch(actions.ClearAction(customerGoalConstants.CUSTOMER_GOAL_REDUCER_CLEAR));
                                                    this.props.history.push('/savings/choose-goal-plan') }} style={{cursor:"pointer"}} className="add-bene m-t-50">Go to Dashboard</a>
                                            </center>

                                        </div>

                                    </div>
                                 
                                </div>

                            </div>

                        </div>

            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    top_up_goal:state.CustomerGoalReducerPile.top_up_goal,
});
export default connect(mapStateToProps)(CashOutGoalSuccess);
