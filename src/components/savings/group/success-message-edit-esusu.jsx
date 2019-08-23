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


class RotatingSavingsEditedSuccessfully extends React.Component {
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
        }, 5000);
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
        const {endDate,endDateInvalid} = this.state;

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
                                            <form className=''>
                                                <img src="/src/assets/img/success.svg" className="succefullMessage" alt=""/>
                                                <div className="form-group">
                                                    <label id="sucMessage" className="sucMg">Rotating Savings Successfully Edited!</label>
                                                </div>
                                                <div className="form-row">
                                                {/* <Members 
                                                   userType="admin"
                                                   name="Group Savings"
                                                   position="Status: running"
                                                   amount={this.props.setAmountToWithDraw}
                                                   intent={this.props.setFrequency}
                                                   id="autoSummary"/> */}
                                                </div>
                                            </form>

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

function mapStateToProps(state){
    return {
        setAmountToWithDraw: state.setAmountToWithDraw.data,
        setFrequency: state.setFrequency.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups:state.customerGroup.data,
        alert:state.alert,

    }
}
export default connect(mapStateToProps)(RotatingSavingsEditedSuccessfully);
