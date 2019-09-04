import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '../container';
import successLogo from '../../../assets/img/success.svg';
import {NavLink} from "react-router-dom";
import { connect } from "react-redux";
import {customerGoalConstants} from '../../../redux/constants/goal/get-customer-trans-history.constant';
import * as actions from '../../../redux/actions/savings/goal/get-customer-transaction-history.actions'

class TopUpGoalSuccess extends React.Component {
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
                                                <li><a className="active">Goals</a></li>
                                            </NavLink>
                                            <NavLink to="/savings/goal/group-savings-selection">
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
                                                            <img className="successIcon" alt="" src={successLogo}/>
                                                        </center>
                                                        <label className="top-goal-Message">{data.details}</label>
                                                    </div>

                                                </form>
                                            </div>
                                            <center>
                                                <a onClick={() => { this.props.dispatch(actions.ClearAction(customerGoalConstants.CUSTOMER_GOAL_REDUCER_CLEAR));
                                                    this.props.history.push('/savings/choose-goal-plan') }} className="add-bene m-t-50">Go to Dashboard</a>
                                            </center>

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
const mapStateToProps = state => ({
    top_up_goal:state.top_up_goal,
});
export default connect(mapStateToProps)(TopUpGoalSuccess);