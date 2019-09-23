import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Members from './list-item';
import { connect } from "react-redux";
import {history} from '../../../_helpers/history';
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import * as actions1 from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';


class JoinGroupSuccessMessage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user"))
        }
    }

    componentDidMount = () => {
        this.CheckGroupSavingsAvailability();
        this.CheckRotatingSavingsAvailability();
        
        setTimeout(() => {
            history.push('/savings/activityDashBoard');
        }, 3000);
    }

    CheckRotatingSavingsAvailability = () => {
        this.props.dispatch(actions1.GetGroupsEsusu(this.state.user.token, null));
    }

    CheckGroupSavingsAvailability = () => {
        this.props.dispatch(actions.customerGroup(this.state.user.token, null));
    }

    NavigateToGroupSavings = () => {
        // let groupSavings = this.props.groups.response; //returns an array
        // let rotatingSavings = this.props.groupSavingsEsusu.response; //returns an array
        // if(groupSavings.length != 0 || rotatingSavings.length != 0){
            history.push('/savings/activityDashBoard');
        //     return;
        // }
        // history.push('/savings/goal/group-savings-selection');
    }

    render() {
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
                                            <li><a href="#">Goals</a></li>
                                        </NavLink>
                                        {/* <NavLink to="/savings/goal/group-savings-selection"> */}
                                            <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                        {/* </NavLink> */}
                                            <li><a href="#">Investments</a></li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {this.props.alert && this.props.alert.message &&
                                <div style={{width: "100%", marginLeft:"150px",marginRight:"150px"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            }
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                            <form>
                                                <div className="form-group">
                                                    <label id="sucMessage">Joined Successfully</label>
                                                </div>
                                                <div className="form-row">
                                                <Members 
                                                   userType="admin"
                                                   name={this.props.joinAGroup.CurrentSlot}
                                                   position="Current Slot"
                                                   amount={this.props.joinAGroup.response.MemberCount}
                                                   intent="Member Count"
                                                   id="autoSummary"/>
                                                </div>
                                            </form>
                                        </div>
                                       </div>
                                      </div>
                                </div>
                            </div>
                        </div>

                  
            </Fragment>
        );
    }
}

function mapStateToProps(state){
    return {
        joinAGroup: state.joinAGroup.data,
        alert:state.alert,

    }
}
export default connect(mapStateToProps)(JoinGroupSuccessMessage);
