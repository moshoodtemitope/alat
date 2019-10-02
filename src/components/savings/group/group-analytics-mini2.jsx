import * as React from "react";
import {Fragment} from "react";
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import SubHead from './sub-head';
import ProgressBar from './progress-bar';
import Buttons from './button';
import { NavButtons } from './component';
import MoreDetails from './details';
import Members from './list-item';
import { connect } from "react-redux";
import {history} from '../../../_helpers/history';
import * as actions from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import { GROUPSAVINGSCONSTANT } from '../../../redux/constants/savings/group';


class GroupAnalyticsMini2 extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            user: JSON.parse(localStorage.getItem("user")),
            type: 2,
            navType: 2,
            buttonType: "bigButton",
            discTopSpan: 'something',
            adminValidity: false,
            isAdmin: false
        }
    
    }

    componentDidMount = () => {
        if(this.props.groupDetails != undefined){
            let isAdmin = this.props.groupDetails.response.isAdmin;
            this.setState({'adminValidity': isAdmin});
            this.setState({'isAdmin': isAdmin});

            let storage = window.localStorage;
            storage.setItem('rotatingGroupId', this.props.groupDetails.response.id)
        }
        
        if(this.props.groupDetails == undefined)
             this.FetchRotatingGroupDetails();
    }

    FetchRotatingGroupDetails = () => {
        let storage = window.localStorage;
        let data = {
            groupId: JSON.parse(storage.getItem('rotatingGroupId'))
        }
        this.props.dispatch(actions.rotatingGroupDetails(this.state.user.token, data));
    }

    SetAdminStatus = () => {
        let isAdmin = this.props.groupDetails.response.isAdmin;
        setTimeout(() => {
            this.setState({isAdmin: isAdmin});
        }, 1000);
    }

    ShowMembers = () => {
        this.props.history.push("/savings/group-mini2");
    }
    
    GroupSummary = () => {
        this.props.history.push("/savings/group-analytics-mini");
    }

    MoveToEditSlot = () => {
        history.push('/savings/group-savings/edit-members-slots');
    }

    ShowEditButton = () => {
        return  <p id='editSlots' onClick={this.MoveToEditSlot}>Edit Slot</p>
    }

    NavigateToGroupSavings = () => {
        
            history.push('/savings/activityDashBoard');
        
    }


    render() {
        const {isAdmin, adminValidity} = this.state;
        
        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS){
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
                                            {/* </NavLink> */}
                                                {/* <li><a href="#">Investments</a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p>loading data ...</p>
                            </div>
    
                        
                </Fragment>
            );
        }
        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_SUCCESS){
            this.SetAdminStatus();
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
                                    
                                                <div class='firstSubHead'>
                                                    <p>ROTATING SAVING GROUP</p>
                                                    <p>{this.props.groupDetails.response.name}</p>
                                                    
                                                </div>
                                                <SubHead 
                                                        type={this.state.type}
                                                        rightname="Group Summary"
                                                        middlename="Members"
                                                        leftName="Members"
                                                        memberClicked={this.ShowMembers}
                                                        groupSummaryWasClicked={this.GroupSummary}
                                                        />
                                            
                                                <div className='statContainer'>
                                                
                                                    {this.props.groupDetails.response.members.map((element,index) => {
                                                        if(element['isAdmin'] == true){
                                                            return <Members 
                                                                key={index}
                                                                userType="admin"
                                                                name={ element['lastName'] + " " + element['firstName'] }
                                                                position="admin"
                                                                />
                                                        }
                                                    })}
    
                                                    {this.props.groupDetails.response.members.map((element, index) => {
                                                        if(element['isAdmin'] == false){
                                                            return <Members 
                                                                            key={index}
                                                                            userType="members"
                                                                            fullname={ element['lastName'] + " " + element['firstName'] }
                                                                            
                                                                            />
                                                        }
                                                    })}
    
                                                    {isAdmin ? this.ShowEditButton() : ""}
                                                    {/* <NavLink to='/group-savings/edit-members-slots'>
                                                            <p id='editSlots'>Edit Slot</p>
                                                    </NavLink> */}
                                                    {adminValidity ? <div></div> : <div className={"setPadBottom"}></div> }
                                                </div>
                
                                            </div>
    
                                        </div>
    
                                        </div>
    
                                    </div>
    
                                </div>
    
                            </div>
    
                      
                </Fragment>
            );
        }
        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_ERROR){
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
        if(this.props.rotatingGroupDetails.data == undefined){
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
                                                {/* <li><a href="#">Investments</a></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p>loading data ...</p>
                            </div>
    
                        
                </Fragment>
            );
        }
        if(this.props.rotatingGroupDetails.data != undefined){
            if(Object.keys(this.props.rotatingGroupDetails.data.response).length == 0)
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
                                                    {/* <li><a href="#">Investments</a></li> */}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <p>loading data ...</p>
                                </div>
        
                            
                    </Fragment>
                );
            if(Object.keys(this.props.rotatingGroupDetails.data.response).length != 0)
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
                                        
                                                    <div class='firstSubHead'>
                                                        <p>ROTATING SAVING GROUP</p>
                                                        <p>{this.props.groupDetails.response.name}</p>
                                                        
                                                    </div>
                                                    <SubHead 
                                                            type={this.state.type}
                                                            rightname="Group Summary"
                                                            middlename="Members"
                                                            leftName="Members"
                                                            memberClicked={this.ShowMembers}
                                                            groupSummaryWasClicked={this.GroupSummary}
                                                            />
                                                
                                                    <div className='statContainer'>
                                                    
                                                        {this.props.groupDetails.response.members.map((element,index) => {
                                                            if(element['isAdmin'] == true){
                                                                return <Members 
                                                                    key={index}
                                                                    userType="admin"
                                                                    name={ element['lastName'] + " " + element['firstName'] }
                                                                    position="admin"
                                                                    />
                                                            }
                                                        })}
        
                                                        {this.props.groupDetails.response.members.map((element, index) => {
                                                            if(element['isAdmin'] == false){
                                                                return <Members 
                                                                                key={index}
                                                                                userType="members"
                                                                                fullname={ element['lastName'] + " " + element['firstName'] }
                                                                                
                                                                                />
                                                            }
                                                        })}
        
                                                        {isAdmin ? this.ShowEditButton() : ""}
                                                        {/* <NavLink to='/group-savings/edit-members-slots'>
                                                                <p id='editSlots'>Edit Slot</p>
                                                        </NavLink> */}
                                                        {adminValidity ? <div></div> : <div className={"setPadBottom"}></div> }
                                                    </div>
                    
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
       groupDetails: state.rotatingGroupDetails.data,
       groupSavingsEsusu: state.getGroupSavingsEsusu.data,
       groups: state.customerGroup.data,
       rotatingGroupDetails: state.rotatingGroupDetails
   }
}

export default connect(mapStateToProps)(GroupAnalyticsMini2)
//export default GroupAnalyticsMini2;









