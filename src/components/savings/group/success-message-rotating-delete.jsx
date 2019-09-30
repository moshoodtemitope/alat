import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '..';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Members from './list-item';
import { connect } from "react-redux";
import {history} from '../../../_helpers/history';
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import * as actions1 from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';


class RotatingSavingsEditedSuccessfullyDeleted extends React.Component {
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
            history.push('/savings/activityDashBoard');
    }


    render() {
        const {endDate,endDateInvalid} = this.state;

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
                                            <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>

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
                                                    <label id="sucMessage" className="sucMg">Group Deleted Successfully!</label>
                                                </div>
                                                <div className="form-row">
                                                
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
        setAmountToWithDraw: state.setAmountToWithDraw.data,
        setFrequency: state.setFrequency.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups:state.customerGroup.data,
        alert:state.alert,

    }
}
export default connect(mapStateToProps)(RotatingSavingsEditedSuccessfullyDeleted);
