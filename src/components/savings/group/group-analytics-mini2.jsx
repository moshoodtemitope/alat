import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '..';
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

// if(window.performance.navigation.type == 1)
//     window.location.replace("http://localhost:8080/");
    
class GroupAnalyticsMini2 extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            type: 2,
            navType: 2,
            buttonType: "bigButton",
            discTopSpan: 'something',
            adminValidity: false,
            isAdmin: false
        }
    
    }

    componentDidMount = () => {
        let isAdmin = this.props.groupDetails.response.isAdmin;
        this.setState({"isAdmin": isAdmin});
        this.setState({'adminValidity': isAdmin});
    }

    ShowMembers = () => {
        this.props.history.push("/savings/group-mini2");
    }
    
    GroupSummary = () => {
        this.props.history.push("/savings/group-analytics-mini");
    }

    MoveToEditSlot = () => {
        history.push('/group-savings/edit-members-slots');
    }

    ShowEditButton = () => {
        return  <p id='editSlots' onClick={this.MoveToEditSlot}>Edit Slot</p>
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

function mapStateToProps(state){
   return {
       groupDetails: state.rotatingGroupDetails.data,
       groupSavingsEsusu: state.getGroupSavingsEsusu.data,
       groups: state.customerGroup.data
   }
}

export default connect(mapStateToProps)(GroupAnalyticsMini2)
//export default GroupAnalyticsMini2;









