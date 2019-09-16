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
import { GROUPSAVINGSCONSTANT } from '../../../redux/constants/savings/group';
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';


class GroupAnalytics3 extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
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

    componentDidMount = () => {
        if(this.props.groupDetails.data != undefined){
            if(Object.keys(this.props.groupDetails.data.response).length != 0){
                let Storage = window.localStorage;
                Storage.setItem('groupSavingsId', this.props.groupDetails.data.response.id);
            }
        }
    }

    HandleNavigation = () => {
        console.log('was fired');
        //return <Redirect to="/savings/group/group-analytics2" />
        this.props.history.push("/savings/group/group-analytics2");
    }

    Automated = () => {
        this.props.history.push('/savings/group/automate-contributions');
    }

    NavigateToGroupSummary = () => {
        this.props.history.push('/savings/group/group-analytics');
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

    FetchGroupDetails = () => {
        // this.props.dispatch(action.groupDetails())
        let Store = window.localStorage;
        let data = {
            groupId: Store.getItem('groupSavingsId')
        }
        this.props.dispatch(actions.groupDetails(this.state.user.token, data));
        console.log('WAS FIRED FFFFFFFFFFFFFF')
    }

    LogUserOut = () => {
        history.push('/');
    }
  
    render() {
        const {endDate,endDateInvalid} = this.state;
        
        if(this.props.groupDetails.data == undefined){
            this.FetchGroupDetails();
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
                                <p>Loading Group Details ...</p>
    
                            </div>
    
                        </SavingsContainer>
                    </InnerContainer>
                </Fragment>
            );
        }

        if(this.props.groupDetails.message === GROUPSAVINGSCONSTANT.GROUPDETAILS){
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
                                <p>Loading Group Details ...</p>
    
                            </div>
    
                        </SavingsContainer>
                    </InnerContainer>
                </Fragment>
            );
        }

        if(this.props.groupDetails.message === GROUPSAVINGSCONSTANT.GROUPDETAILS_ERROR){
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
                                <p>Please Check Your Internet Connection ...</p>
    
                            </div>
    
                        </SavingsContainer>
                    </InnerContainer>
                </Fragment>
            );
        }

        if(this.props.groupDetails.message === GROUPSAVINGSCONSTANT.GROUPDETAILS_SUCCESS){
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
                                                    right="right"
                                                    />
                                               
                                                 <div className='statContainer'>
                                                     <p id="short-note-automate">ALAT will pay your contributions automatically based on your preset savings schedule.</p>
                                                     <NavLink to="/savings/group/automate-group-savings">
                                                        <Buttons
                                                            buttonType={this.state.buttonType}
                                                            buttonName="Get Started"
                                                            id='bigBot'
                                                            />    
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
 
        if(this.props.groupDetails.data != undefined){
            if(Object.keys(this.props.groupDetails.data.response).length != 0){
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
                                                        right="right"
                                                        />
                                                   
                                                     <div className='statContainer'>
                                                         <p id="short-note-automate">ALAT will pay your contributions automatically based on your preset savings schedule.</p>
                                                         <NavLink to="/savings/group/automate-group-savings">
                                                            <Buttons
                                                                buttonType={this.state.buttonType}
                                                                buttonName="Get Started"
                                                                id='bigBot'
                                                                />    
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
            }else{
                this.LogUserOut();
                return(
                    <div>
                        <p>Something is not right ... Logging you out</p>
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

export default connect(mapStateToProps)(GroupAnalytics3);
 










