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

class GroupAnalytics2 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            type: 3,
            userType: 'members',
            navType: 1,
            buttonType: "bigButton",
            discTopSpan: 'something'
        }

        this.HandleNavigation = this.HandleNavigation.bind(this);
        this.Automated = this.Automated.bind(this);
        this.NavigateToGroupSummary = this.NavigateToGroupSummary.bind(this);
    }

    HandleNavigation = () => {
        this.props.history.push("/savings/group/group-analytics2");
    }

    Automated = () => {
        this.props.history.push('/savings/group/automate-contributions');
    }

    NavigateToGroupSummary = () => {
        this.props.history.push('/savings/group/group-analytics');
    }

    // GetMembers = () => {
    //    const allMembers = this.props.groupDetails.response.members.map(element => {
    //         if(element.isAdmin == false){
    //             <Members 
    //             userType="members"
    //             fullname={element.lastName.concat(" ", element.firstName)}

    //             amount={element.amountSaved}
    //             intent="Contribution"/>
    //         }
    //     });
    //     return allMembers;
    // }

    // GetAmin = () => {
    //     const admin = this.props.groupDetails.response.members.map(element => {
    //         if(element.isAdmin == true){
    //             <Members 
    //                 userType="admin"
    //                 name={element.lastName.concat(" ", element.firstName)}
    //                 position="Admin"
    //                 amount={element.amountSaved}
    //                 intent="Contribution"/>

    //         }
    //     });

    //     return admin;
    // }

  
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
                                               <Members 
                                                   userType="admin"
                                                   name="Hasan Danfodio"
                                                   position="admin"
                                                   amount="N10, 000"
                                                   intent="Contribution"/>

                                               <Members 
                                                   userType="members"
                                                   fullname="Stan Lee"
                                    
                                                   amount="N10, 000"
                                                   intent="Contribution"/>

                                                <Members 
                                                   userType="members"
                                                   fullname="Christopher Columbus"
                                    
                                                   amount="N10, 000"
                                                   intent="Contribution"/>
                                                <Members 
                                                   userType="members"
                                                   fullname="Odelade Hammed"
                                                   amount="N10, 000"
                                                   intent="Contribution"/>

                                                <Members 
                                                   userType="members"
                                                   fullname="Stallion Zin"
                                    
                                                   amount="N10, 000"
                                                   intent="Contribution"/>

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
      groupDetails: state.groupDetails.data
    }
}

export default connect(mapStateToProps)(GroupAnalytics2)

//export default GroupAnalytics2;
 










