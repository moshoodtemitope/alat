import * as React from "react";
import { Fragment } from "react";
import { NavLink, Route, Redirect } from "react-router-dom";
import { Switch } from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import { history } from '../../../_helpers/history';
import { GROUPSAVINGSCONSTANT } from '../../../redux/constants/savings/group';


class RotatingDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            status: "No",
            confirmDelete: false,
            DeleteInvalid: false
        }
    }

    componentDidMount = () => {
        if (this.props.rotatingGroupDetails != undefined) {
            window.localStorage.setItem('rotatingGroupId', this.props.rotatingGroupDetails.response.id);
        }
    }

    FetchRotatingGroupDetails = () => {
        let storage = window.localStorage;
        let data = {
            groupId: JSON.parse(storage.getItem('rotatingGroupId'))
        }
        this.props.dispatch(actions.rotatingGroupDetails(this.state.user.token, data));
    }

    validateForm = () => {
        if (this.state.status != "Yes") {
            this.setState({ confirmDelete: true });
        } else {
            this.setState({ confirmDelete: false });
        }
    }

    GoBackToMiniNav = () => {
        history.push('/savings/group-analytics-mini');
    }

    ChangeState = (event) => {
        this.setState({ status: event.target.value });
    }

    DeleteTheGroup = () => {
        let data = {
            groupId: this.props.rotatingGroupDetails.response.id
        };

        this.props.dispatch(actions.deleteGroupEsusu(this.state.user.token, data));
    }

    SubmitForm = (event) => {
        event.preventDefault();
        this.validateForm();

        if (this.state.status == "Yes")
            this.DeleteTheGroup();
    }

    NavigateToGroupSavings = () => {
        history.push('/savings/activityDashBoard');
    }


    render() {
        const { confirmDelete } = this.state;
        if (this.props.rotatingGroupDetails == undefined) {
            this.FetchRotatingGroupDetails();
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
                                        <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>

                                        {/* <li><a href="#">Investments</a></li> */}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p>Loading Data ...</p>
                    </div>

                </Fragment>
            );
        }

        if (this.props.rotatingGroupDetailsReload.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS) {
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
                                        <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p>Loading Data ...</p>
                    </div>

                </Fragment>
            );
        }
        if (this.props.rotatingGroupDetailsReload.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_SUCCESS) {
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
                                        <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>

                                        {/* <li><a href="#">Investments</a></li> */}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-sm-12">
                            {this.props.alert && this.props.alert.message &&
                                <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            }
                            <div className="row">
                                
                                <div className="col-sm-12">
                                    <div className="max-600">
                                        <div className="al-card no-pad">
                                            <h4 className="m-b-10 center-text hd-underline">Confirm Delete!</h4>

                                            <form>
                                                <div className="form-row">
                                                    <div className={confirmDelete ? "form-group form-error col-md-11" : "form-group col-md-11"}>
                                                        <label className="label-text">Are you sure you want to delete this group?</label>
                                                        <select onChange={this.ChangeState}>
                                                            <option value="No" selected>No</option>
                                                            <option value="Yes">Yes</option>
                                                        </select>
                                                        {confirmDelete && <div className='text-danger'>Select Yes to delete</div>}
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>

                                                            <button type="submit" onClick={this.GoBackToMiniNav} className="btn-alat m-t-10 m-b-20 text-center goBackButMini">Go Back</button>
                                                            <button disabled={this.props.deleteGroupEsusu.message === GROUPSAVINGSCONSTANT.DELETEGROUP} type="submit" onClick={this.SubmitForm} className="btn-alat m-t-10 m-b-20 text-center"> {this.props.deleteGroupEsusu.message === GROUPSAVINGSCONSTANT.DELETEGROUP ? "Processing..." : "Proceed"}</button>

                                                        </center>
                                                    </div>
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
        if (this.props.rotatingGroupDetailsReload.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_ERROR) {
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
                                        <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>

                                        {/* <li><a href="#">Investments</a></li> */}

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p>Please Check Your Internet Connection ...</p>
                    </div>

                </Fragment>
            );
        }

        if (this.props.rotatingGroupDetails != undefined) {
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
                                        <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>

                                        {/* <li><a href="#">Investments</a></li> */}

                                    </ul>
                                </div>
                            </div>
                        </div>
                       
                        <div className="col-sm-12">
                            {this.props.alert && this.props.alert.message &&
                                <div className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            }
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="max-600">
                                        <div className="al-card no-pad">
                                            <h4 className="m-b-10 center-text hd-underline">Confirm Delete!</h4>

                                            <form>
                                                <div className="form-row">
                                                    <div className={confirmDelete ? "form-group form-error col-md-11" : "form-group col-md-11"}>
                                                        <label className="label-text">Are you sure you want to delete this group?</label>
                                                        <select onChange={this.ChangeState}>
                                                            <option value="No" selected>No</option>
                                                            <option value="Yes">Yes</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <center>

                                                            <button type="submit" onClick={this.GoBackToMiniNav} className="btn-alat m-t-10 m-b-20 text-center goBackButMini">Go Back</button>
                                                            <button disabled={this.props.deleteGroupEsusu.message === GROUPSAVINGSCONSTANT.DELETEGROUP} type="submit" onClick={this.SubmitForm} className="btn-alat m-t-10 m-b-20 text-center"> {this.props.deleteGroupEsusu.message === GROUPSAVINGSCONSTANT.DELETEGROUP ? "Processing..." : "Proceed"}

                                                            </button>

                                                        </center>
                                                    </div>
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
}

function mapStateToProps(state) {
    return {
        createGroupSavings: state.createRotatingGroupSavings.data,
        rotatingGroupDetails: state.rotatingGroupDetails.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        rotatingGroupDetailsReload: state.rotatingGroupDetails,
        deleteGroupEsusu: state.deleteGroupEsusu,
        alert: state.alert
    }
}
export default connect(mapStateToProps)(RotatingDelete);
