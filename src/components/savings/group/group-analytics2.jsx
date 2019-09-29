import * as React from "react";
import {Fragment} from "react";
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
import { GROUPSAVINGSCONSTANT } from '../../../redux/constants/savings/group';
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';

    
class GroupAnalytics2 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            type: 3,
            userType: 'members',
            navType: 1,
            buttonType: "bigButton",
            discTopSpan: 'something',
            isAdmin: false,
            adminValidity: false
        };

        this.HandleNavigation = this.HandleNavigation.bind(this);
        this.Automated = this.Automated.bind(this);
        this.NavigateToGroupSummary = this.NavigateToGroupSummary.bind(this);
    }

    componentDidMount = () => {
        if(this.props.groupDetails.data != undefined){
            if(Object.keys(this.props.groupDetails.data.response).length != 0){
                let isAdmin = this.props.groupDetails.data.response.isAdmin;
                this.setState({
                    isAdmin: isAdmin
                });
    
                this.setState({'adminValidity': isAdmin});

                let Store = window.localStorage;
                Store.setItem('groupSavingsId', this.props.groupDetails.data.response.id);
            }
        }
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
        // let groupSavings = this.props.groups.response; //returns an array
        // let rotatingSavings = this.props.groupSavingsEsusu.response; //returns an array
        // if(groupSavings.length != 0 || rotatingSavings.length != 0){
            history.push('/savings/activityDashBoard');
        //     return;
        // }
        // history.push('/savings/goal/group-savings-selection');
    }

    ShowManageButton = () => {
        return <p id="manageButton">Manage</p>
    }

    SetAdminStatus = () => {
        let isAdmin = this.props.groupDetails.data.response.isAdmin;
        setTimeout(() => {
            this.setState({isAdmin: isAdmin});
        }, 1000);
    }

    FetchGroupDetails = () => {
        // this.props.dispatch(action.groupDetails())
        let Store = window.localStorage;
        let data = {
            groupId: Store.getItem('groupSavingsId')
        }
        this.props.dispatch(actions.groupDetails(this.state.user.token, data));
        // console.log('WAS FIRED FFFFFFFFFFFFFF')
    }

    LogUserOut = () => {
        history.push('/');
    }
  
    render() {
        const { isAdmin, adminValidity } = this.state;
        if(this.props.groupDetails.data == undefined){
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
                                            {/* </NavLink> */}
                                                <li><a href="#">Investments</a></li>

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p>Loading Group Detials ...</p>
                        

                            </div>

                        
                </Fragment>
            );
        }

        if(this.props.groupDetails.message === GROUPSAVINGSCONSTANT.GROUPDETAILS){
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
                                <p>Loading Group Detials ...</p>
                        

                            </div>

                        
                </Fragment>
            );
        }

        if(this.props.groupDetails.message === GROUPSAVINGSCONSTANT.GROUPDETAILS_ERROR){
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
                                               
    
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <p>Please Check your network ...</p>
    
                            </div>
    
                        
                </Fragment>
            );
        }

        if(this.props.groupDetails.message === GROUPSAVINGSCONSTANT.GROUPDETAILS_SUCCESS){
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
                                                <li onClick={this.NavigateToGroupSavings}><a className="active">Group Savings</a></li>
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
                                                      <p>Target Group</p>
                                                      <p>{this.props.groupDetails.data.response.name}</p>
                                                      <p>{this.props.groupDetails.data.response.purpose}</p>
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
                                                          {this.props.groupDetails.data.response.members.map((element, index) => {
                                                              if(element.isAdmin == true){
                                                                return <Members 
                                                                    key={index}
                                                                    userType="admin"
                                                                    name={element['lastName'] + " " + element['firstName']}
                                                                    position="Admin"
                                                                    amount={element['amountSaved']}
                                                                    intent="Contribution"/>
                                                              }
    
                                                          })} {this.props.groupDetails.data.response.members.map((element, index) => {
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
                                                       {isAdmin ? this.ShowManageButton() : ""}
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

        if(this.props.groupDetails.data != undefined){
            if(Object.keys(this.props.groupDetails.data.response).length != 0){
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
                                                          <p>{this.props.groupDetails.data.response.name}</p>
                                                          <p>{this.props.groupDetails.data.response.purpose}</p>
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
                                                              {this.props.groupDetails.data.response.members.map((element, index) => {
                                                                  if(element.isAdmin == true){
                                                                    return <Members 
                                                                        key={index}
                                                                        userType="admin"
                                                                        name={element['lastName'] + " " + element['firstName']}
                                                                        position="Admin"
                                                                        amount={element['amountSaved']}
                                                                        intent="Contribution"/>
                                                                  }
        
                                                              })} {this.props.groupDetails.data.response.members.map((element, index) => {
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
                                                           {isAdmin ? this.ShowManageButton() : ""}
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
            }else{
                this.LogUserOut();
                return(
                    <div>
                        <p>Something is not Right ...  logging you out.</p>
                    </div>
                )
            }
        }
    }
}

function mapStateToProps(state){
    return {
      groupDetails: state.groupDetails,
      groupSavingsEsusu: state.getGroupSavingsEsusu.data,
      groups: state.customerGroup.data
    }
}

export default connect(mapStateToProps)(GroupAnalytics2)

 










