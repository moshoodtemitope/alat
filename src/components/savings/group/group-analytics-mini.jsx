import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import SubHead from './sub-head';
import ProgressBar from './progress-bar';
import Buttons from './button';
import { connect } from "react-redux";
import { NavButtons } from './component';
import MoreDetails from './details';
import * as actions from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';
import {history} from '../../../_helpers/history';
import moment from 'moment';
import { GROUPSAVINGSCONSTANT } from '../../../redux/constants/savings/group';



class GroupAnalyticsMini extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            user: JSON.parse(localStorage.getItem("user")),
            type: 2,
            navType: 2,
            buttonType: "bigButton",
            discTopSpan: 'something',
            isAdmin: false,
            adminValidity: false
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

    GetSmallNavs = () => {
        return <div className='miniNav'>
                    <div className='left'>
                     <p onClick={this.MoveToEditGroupEsusu}>Edit</p>
                    </div>
                    <div className='right'>
                        <p onClick={this.DeleteGroup}>Delete</p>
                    </div>
               </div>
    }

    ShowMembers = () => {
        this.props.history.push("/savings/group-mini2");
    };

    GroupSummary = () => {
        this.props.history.push("/savings/group-analytics-mini");
    };

    PotContribution = () =>{
        return "₦" + this.props.groupDetails.response.potContribution;
    };

    UpNext = () => {
        const data = this.props.groupDetails.response.members;
        const currentSlot = this.props.groupDetails.response.currentSlot;
        var nextCollector;
        for(var i=0; i<data.length; i++){
            if(data[i]['slot'] == currentSlot)
                nextCollector = data[i]['firstName']; 
        }
        return nextCollector;
    };

    GetStatusOfGroupMessage = () => {
        return this.props.groupDetails.response.status + "% completion";
    };
    GetStatusOfGroup = () => {
        return this.props.groupDetails.response.status;
    };
    GetReferalCode = () => {
        return this.props.groupDetails.response.referralCode;
    };

    GetStartDate = () => {
        return moment(this.props.groupDetails.response.startDate).format('DD/MM/YYYY')
    };

    GroupName = () => {
        return this.props.groupDetails.response.name;
    };

    GetMonthlyContribution = () => {
        return this.props.groupDetails.response.monthlyContribution;
    };

    MemberCount = () => {
        return this.props.groupDetails.response.memberCount;
    };

    DeleteGroup = () => {
       history.push('/savings/rotating-confirm-delete');
    };

    MoveToEditGroupEsusu = () => {
        history.push('/group-savings/edit-rotating');
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
        const {isAdmin, adminValidity} = this.state;
        
        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS){
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
                                  <p>loading group details ...</p>
    
                                </div>
    
                            </div>
    
                        </SavingsContainer>
                    </InnerContainer>
                </Fragment>
            );
        }
        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_SUCCESS){
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
                                                 <div class='firstSubHead'>
                                                      <p>ROTATING SAVING GROUP</p>
                                                      <p>{this.props.groupDetails.response.name}</p>
                                                 </div>
                                                    <SubHead 
                                                        type={this.state.type}
                                                        rightname="Group Summary"
                                                        leftName="Members"
                                                        memberClicked={this.ShowMembers}
                                                        groupSummaryWasClicked={this.GroupSummary}
                                                        />
                                                        
                                                 <div className='statContainer'>
                                                    <ProgressBar 
                                                        discTopSpan="Group Progress"
                                                        discTopRight={this.GetStatusOfGroupMessage()}
                                                        percentage={this.GetStatusOfGroup()}
                                                        
                                                        discSpan={this.PotContribution()}
                                                        discBottomSib="Pot Total"
                                                        />                
                                                        <p id="firstPoint">Payment</p>
                                                        <p id='secondPoint'>{this.UpNext}</p>
                                                        <p id='thirdPoint'>Up Next</p>
                                                        
                                                        <MoreDetails 
                                                          lefthead={this.GetStartDate()}
                                                          leftBottom="Target Date"
                                                          rightContent={this.GetReferalCode()}
                                                          rightContentBottom="Group Code"
                                                         />
    
                                                        <Buttons
                                                            buttonType={this.state.buttonType}
                                                            buttonName="Start"          
                                                            />
                                                        
                                                        {isAdmin ? this.GetSmallNavs() : ""}
    
                                                        {adminValidity ? <div></div> : <div className={"setPadBottom"}></div> }
                                                        
                                                 </div>
                                                 
                                                 
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
        if(this.props.rotatingGroupDetails.message === GROUPSAVINGSCONSTANT.ROTATING_GROUP_DETAILS_ERROR){
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
                                  <p>Please Check Your Network Connection ...</p>
    
                                </div>
    
                            </div>
    
                        </SavingsContainer>
                    </InnerContainer>
                </Fragment>
            );
        }

        if(this.props.rotatingGroupDetails.data == undefined){
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
                                  <p>loading group details ...</p>
    
                                </div>
    
                            </div>
    
                        </SavingsContainer>
                    </InnerContainer>
                </Fragment>
            );
        }
        
        if(this.props.rotatingGroupDetails.data != undefined){
            if(Object.keys(this.props.rotatingGroupDetails.data.response).length == 0)
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
                                    <p>loading group details ...</p>
        
                                    </div>
        
                                </div>
        
                            </SavingsContainer>
                        </InnerContainer>
                    </Fragment>
                );
            if(Object.keys(this.props.rotatingGroupDetails.data.response).length != 0)
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
                                                    <div class='firstSubHead'>
                                                        <p>ROTATING SAVING GROUP</p>
                                                        <p>{this.props.groupDetails.response.name}</p>
                                                    </div>
                                                        <SubHead 
                                                            type={this.state.type}
                                                            rightname="Group Summary"
                                                            leftName="Members"
                                                            memberClicked={this.ShowMembers}
                                                            groupSummaryWasClicked={this.GroupSummary}
                                                            />
                                                            
                                                    <div className='statContainer'>
                                                        <ProgressBar 
                                                            discTopSpan="Group Progress"
                                                            discTopRight={this.GetStatusOfGroupMessage()}
                                                            percentage={this.GetStatusOfGroup()}
                                                            
                                                            discSpan={this.PotContribution()}
                                                            discBottomSib="Pot Total"
                                                            />               
                                                            <p id="firstPoint">Payment</p>
                                                            <p id='secondPoint'>{this.UpNext}</p>
                                                            <p id='thirdPoint'>Up Next</p>
                                                            
                                                            <MoreDetails 
                                                            lefthead={this.GetStartDate()}
                                                            leftBottom="Target Date"
                                                            rightContent={this.GetReferalCode()}
                                                            rightContentBottom="Group Code"
                                                            />
        
                                                            <Buttons
                                                                buttonType={this.state.buttonType}
                                                                buttonName="Start"          
                                                                />
                                                            
                                                            {isAdmin ? this.GetSmallNavs() : ""}
        
                                                            {adminValidity ? <div></div> : <div className={"setPadBottom"}></div> }
                                                            
                                                    </div>
                                                    
                                                    
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
}

function mapStateToProps(state){
    return {
        groupDetails: state.rotatingGroupDetails.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data,
        rotatingGroupDetails: state.rotatingGroupDetails
    }
 }
 
 export default connect(mapStateToProps)(GroupAnalyticsMini);
 































