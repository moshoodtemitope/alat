import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import {history} from '../../../_helpers/history';

class GroupDelete extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            status: "No",
            confirmDelete: false
        }
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
    
    render() {
        const { confirmDelete } = this.state;
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
                                            <li onClick={this.NavigateToGroupSavings}><a href="#">Group Savings</a></li>
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
<<<<<<< HEAD
                                                            <button type="submit" onClick={this.SubmitForm} className="btn-alat m-t-10 m-b-20 text-center">Proceed</button>
                                                            
=======
                                                        <button type="submit" onClick={this.SubmitForm} className="btn-alat m-t-10 m-b-20 text-center">Proceed</button>  
>>>>>>> lifestyle/lifestyle-master
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

                    </SavingsContainer>
                </InnerContainer>
            </Fragment>
        );
    }
}

function mapStateToProps(state){
    return {
        createGroupSavings: state.createRotatingGroupSavings.data,
        rotatingGroupDetails: state.rotatingGroupDetails.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        groupDetails: state.groupDetails.data
    }
}
export default connect(mapStateToProps)(GroupDelete);
