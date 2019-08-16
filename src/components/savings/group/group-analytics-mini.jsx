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

class GroupAnalyticsMini extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            user: JSON.parse(localStorage.getItem("user")),
            type: 2,
            navType: 2,
            buttonType: "bigButton",
            discTopSpan: 'something'
        }
    }

    ShowMembers = () => {
        this.props.history.push("/savings/group-mini2");
    }
    
    GroupSummary = () => {
        this.props.history.push("/savings/group-analytics-mini");
    }

    PotContribution = () =>{
        return this.props.groupDetails.response.potContribution;
    }

    UpNext = () => {
        const data = this.props.groupDetails.response.members;
        const currentSlot = this.props.groupDetails.response.currentSlot;
        var nextCollector;
        for(var i=0; i<data.length; i++){
            if(data[i]['slot'] == currentSlot)
                nextCollector = data[i]['firstName']; 
        }
        return nextCollector;
    }

    GetStatusOfGroupMessage = () => {
        return this.props.groupDetails.response.status + "% completion";
    }
    GetStatusOfGroup = () => {
        return this.props.groupDetails.response.status;
    }
    GetReferalCode = () => {
        return this.props.groupDetails.response.referralCode;
    }

    GetStartDate = () => {
        return this.props.groupDetails.response.startDate
    }

    GroupName = () => {
        return this.props.groupDetails.response.name;
    }

    GetMonthlyContribution = () => {
        return this.props.groupDetails.response.monthlyContribution;
    }

    MemberCount = () => {
        return this.props.groupDetails.response.memberCount;
    }

    DeleteGroup = () => {
        let data = {
            groupId: this.props.groupDetails.response.id
        }
        this.props.dispatch(actions.deleteGroupEsusu(this.state.user.token, data));
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
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-sm-12">
                                      <div className="max-600">
                                       <div className="al-card no-pad">
                                    
                                             <div class='firstSubHead'>
                                                  <p>ROTATING SAVING GROUP</p>
                                                  <p>Summer Trip To Africa</p>
                                                  
                                             </div>
                                                <SubHead 
                                                    type={this.state.type}
                                                    rightname="Group Summary"
                                                    middlename="Members"
                                                    leftName="Automate Contributions"
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
                                                    
                                                    <div className='miniNav'>
                                                        <div className='left'>
                                                           <NavLink to='/group-savings/edit-rotating'>
                                                               <p>Edit</p>
                                                           </NavLink>
                                                        </div>
                                                        <div className='right'>
                                                            <p onClick={this.DeleteGroup}>Delete</p>
                                                        </div>
                                                </div>        
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

function mapStateToProps(state){
    return {
        groupDetails: state.rotatingGroupDetails.data,
        groupSavingsEsusu: state.getGroupSavingsEsusu.data,
        groups: state.customerGroup.data
    }
 }
 
 export default connect(mapStateToProps)(GroupAnalyticsMini);
 







