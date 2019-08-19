import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '../container';
import {NavLink, Route} from "react-router-dom";
import { connect } from "react-redux";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import * as actions1 from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import {history} from '../../../_helpers/history';

if(window.performance.navigation.type == 1)
    window.location.replace("http://localhost:8080/");
    
class GroupCreated extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            user: JSON.parse(localStorage.getItem("user"))
        }
    }

    componentDidMount(){
        this.GetGroupSummary();
        this.CheckGroupSavingsAvailability();
        this.CheckRotatingSavingsAvailability();
    }

    CheckRotatingSavingsAvailability = () => {
        this.props.dispatch(actions1.GetGroupsEsusu(this.state.user.token, null));
    }

    CheckGroupSavingsAvailability = () => {
        this.props.dispatch(actions.customerGroup(this.state.user.token, null));
    }


    GetGroupSummary = () => {
        const id = this.props.payload.response.id;
        const data = {
            groupId: id
        }
        this.props.dispatch(actions.groupDetails(this.state.user.token, data));
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        return null;
    }

    NavigateToGroupSavings = () => {
        let groupSavings = Object.keys(this.props.groups); //returns an array
        let rotatingSavings = Object.keys(this.props.groupSavingsEsusu); //returns an array
        if(groupSavings.length != 0 || rotatingSavings.length != 0){
            history.push('/savings/activityDashBoard');
            return;
        }
        history.push('/savings/goal/group-savings-selection');
    }

    CopyCode = (event) => {
        document.execCommand('copy');
        event.target.focus();
    }

    render() {
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
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                       <h4 className="m-b-10 center-text hd-underline">Group Created</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group instruction">
                                                    <h6>Use the code below to invite your friends to join the group.</h6>
                                                </div>
                                                <div className="forCode">
                                                        <div className="left">
                                                            <h2>{this.props.payload.response.referralCode}</h2>
                                                        </div>
                                                        <div className="right">
                                                            <i onClick={this.CopyCode}></i>
                                                        </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6 butLeft">
                                                        <button>Share Code</button>
                                                    </div>
                                                    <div className="form-group col-md-6 butRight">
                                                        <NavLink to='/savings/group/group-analytics'>
                                                              <button>Proceed To Group</button>
                                                        </NavLink>
                                                    </div>
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
        payload: state.groupSavings.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data
    }
}
export default connect(mapStateToProps)(GroupCreated);
