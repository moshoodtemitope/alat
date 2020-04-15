import * as React from "react";
import {Fragment} from "react";
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import {history} from '../../../_helpers/history';
import { GROUPSAVINGSCONSTANT } from '../../../redux/constants/savings/group';


class GroupDelete extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            status: "No",
            confirmDelete: false
        }
    }

    componentDidMount = () => {
        if(this.props.groupDetails != undefined){
            window.localStorage.setItem('groupSavingsId', this.props.groupDetails.response.id);
        }
    }

    FetchGroupDetails = () => {
        let Store = window.localStorage;
        let data = {
            groupId: Store.getItem('groupSavingsId')
        }
        this.props.dispatch(actions.groupDetails(this.state.user.token, data));
    }
    

    validateForm = () => {
        if(this.state.status != "Yes"){
            this.setState({confirmDelete: true});
        }else{
            this.setState({confirmDelete: false});
        }
    }

    GoBackToGroupAnalytics = () => {
        history.push('/savings/group/group-analytics');
    }

    ChangeState = (event) => {
        this.setState({status: event.target.value});
    }

    DeleteTheGroup = () => {
        let id = this.props.groupDetails.response.id;
        let data = {
            groupId: parseInt(id),
            deleteGroup: 'deleteGroup'
        };
        this.props.dispatch(actions.deleteGroup(this.state.user.token, data));
    }

    SubmitForm = (event) => {
        event.preventDefault();
        this.validateForm();

        if(this.state.status == "Yes")
             this.DeleteTheGroup();
    }

    NavigateToGroupSavings = () => {
        history.push('/savings/activityDashBoard');
    }

    
    render() {
        const { confirmDelete } = this.state;

        if(this.props.groupDetailsReload.data == undefined){
            this.FetchGroupDetails();
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
                                                <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
                                            {/* </NavLink> */}
                                                
                                            
    
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                               <p>Loading Data ...</p>
                            </div>
    
                </Fragment>
            );
        }

        if(this.props.groupDetailsReload.message === GROUPSAVINGSCONSTANT.GROUPDETAILS){
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
                                                <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
                                            {/* </NavLink> */}
                                                
                                 
    
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                               <p>Loading Data ...</p>
                            </div>
    
                </Fragment>
            );
        }

        if(this.props.groupDetailsReload.message === GROUPSAVINGSCONSTANT.GROUPDETAILS_SUCCESS){
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
                                                <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
                                            {/* </NavLink> */}
                                                
                             
    
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
                                                            <select  onChange={this.ChangeState}>
                                                                <option value="No" selected>No</option>
                                                                <option value="Yes">Yes</option>
                                                                </select>
                                                            {confirmDelete && <div className='text-danger'>Select Yes to delete</div>}
                                                       </div>
                                                    </div>
    
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
    
                                                            <button type="submit" onClick={this.GoBackToGroupAnalytics} className="btn-alat m-t-10 m-b-20 text-center goBackButMini">Go Back</button>
                                                            <button disabled={this.props.deleteGroupEsusu.message === GROUPSAVINGSCONSTANT.DELETEGROUP} type="submit" onClick={this.SubmitForm} className="btn-alat m-t-10 m-b-20 text-center">{this.props.deleteGroupEsusu.message === GROUPSAVINGSCONSTANT.DELETEGROUP ? "Processing":"Proceed"}</button>
                                                                
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

        if(this.props.groupDetailsReload.message === GROUPSAVINGSCONSTANT.GROUPSAVINGSCONSTANT.GROUPDETAILS_ERROR){
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
                                                <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
                                            {/* </NavLink> */}
                                                
                                          
    
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                               <p>Please Check Your Network Connection ...</p>
                            </div>
    
                </Fragment>
            );
        }

        if(this.props.groupDetailsReload.data != undefined){
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
                                                <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
                                            {/* </NavLink> */}
                                                
                                        
    
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
                                                            <select  onChange={this.ChangeState}>
                                                                <option value="No" selected>No</option>
                                                                <option value="Yes">Yes</option>
                                                            </select>
                                                       </div>
                                                    </div>
    
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <center>
    
                                                            <button type="submit" onClick={this.GoBackToGroupAnalytics} className="btn-alat m-t-10 m-b-20 text-center goBackButMini">Go Back</button>
                                                            <button disabled={this.props.deleteGroupEsusu.message === GROUPSAVINGSCONSTANT.DELETEGROUP} type="submit" onClick={this.SubmitForm} className="btn-alat m-t-10 m-b-20 text-center">{this.props.deleteGroupEsusu.message === GROUPSAVINGSCONSTANT.DELETEGROUP ? "Processing" :"Proceed"}</button>
                                                                
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

function mapStateToProps(state){
    return {
        createGroupSavings: state.createRotatingGroupSavings.data,
        rotatingGroupDetails: state.rotatingGroupDetails.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        groupDetails: state.groupDetails.data,
        groupDetailsReload: state.groupDetails,
        deleteGroupEsusu: state.deleteGroupEsusu,
        alert:state.alert
    }
}
export default connect(mapStateToProps)(GroupDelete);
