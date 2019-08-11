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
import { NavButtons } from './component';
import MoreDetails from './details';
import Members from './list-item';
import { connect } from "react-redux";

class GroupAnalyticsMini2 extends React.Component {
    constructor(props){
        super(props);
        this.state= {
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
                                        <NavLink to="/savings/goal/group-savings-selection">
                                            <li><a className="active">Group Savings</a></li>
                                        </NavLink>
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
                                                   <NavLink to='/group-savings/edit-members-slots'>
                                                         <p id='editSlots'>Edit Slot</p>
                                                   </NavLink>
                                                   
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
       groupDetails: state.rotatingGroupDetails.data
   }
}

export default connect(mapStateToProps)(GroupAnalyticsMini2)
//export default GroupAnalyticsMini2;









