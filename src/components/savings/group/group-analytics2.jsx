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
import SubHead from './sub-head';
import ProgressBar from './progress-bar';
import GroupDetail from './list-item';
import Buttons from './button';
import { NavButtons } from './component';
import MoreDetails from './details';
import Members from './list-item';
import {history} from '../../../_helpers/history';

if(window.performance.navigation.type == 1)
    window.location.replace("http://localhost:8080/");
    
class GroupAnalytics2 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            type: 3,
            userType: 'members',
            navType: 1,
            buttonType: "bigButton",
            discTopSpan: 'something'
        };

        this.HandleNavigation = this.HandleNavigation.bind(this);
        this.Automated = this.Automated.bind(this);
        this.NavigateToGroupSummary = this.NavigateToGroupSummary.bind(this);
    }

    HandleNavigation = () => {
        this.props.history.push("/savings/group/group-analytics2");
    };

    Automated = () => {
        this.props.history.push('/savings/group/automate-contributions');
    };

    NavigateToGroupSummary = () => {
        this.props.history.push('/savings/group/group-analytics');
    };

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
                                                  <p>Target Group</p>
                                                  <p>Summer Trip To Africa</p>
                                                  <p>Trip to kenya with boys</p>
                                             </div>
                                                <SubHead 
                                                type={this.state.type}
                                                rightname="Group Summary"
                                                middlename="Members"
                                                leftName="Automate Contributions"
                                                memberClicked={this.HandleNavigation}
                                                automatedwasclicked={this.Automated}
                                                groupsummarywasclicked={this.NavigateToGroupSummary}
                                                middle="middle"
                                                />
                                           
                                             <div className='statContainer'>
                             
                                                   <div>
                                                      {this.props.groupDetails.response.members.map((element, index) => {
                                                          if(element.isAdmin == true){
                                                            return <Members 
                                                                key={index}
                                                                userType="admin"
                                                                name={element['lastName'] + " " + element['firstName']}
                                                                position="Admin"
                                                                amount={element['amountSaved']}
                                                                intent="Contribution"/>
                                                          }

                                                      })} {this.props.groupDetails.response.members.map((element, index) => {
                                                        if(element.isAdmin == false){
                                                            return  <Members 
                                                                        key={index}
                                                                        userType="members"
                                                                        fullname={ element['lastName'] + " " + element['firstName'] }
                                                                        
                                                                        amount={element['amountSaved']}
                                                                        intent="Contribution"/>
                                                          }
                                                      })}
                                                   </div>
                                                   <div></div>
                                                   <p id="manageButton">Manage</p>
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
      groupDetails: state.groupDetails.data,
      groupSavingsEsusu: state.getGroupSavingsEsusu.data,
      groups: state.customerGroup.data
    }
}

export default connect(mapStateToProps)(GroupAnalytics2)

//export default GroupAnalytics2;
 










