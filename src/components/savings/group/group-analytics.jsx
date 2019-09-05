import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '..';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import theMonth from '../../../shared/components/timeCalculator';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import SubHead from './sub-head';
import ProgressBar from './progress-bar';
import GroupDetail from './list-item';
import Buttons from './button';
import { NavButtons } from './component';
import MoreDetails from './details';
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';
import {history} from '../../../_helpers/history';

class GroupAnalytics extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            type: 3,
            userType: 'members',
            navType: 3,
            buttonType: "bigButton",
            discTopSpan: 'something',
            groupDetails: null,
            isAdmin: false,
            adminValidity: false
        }

        this.HandleNavigation = this.HandleNavigation.bind(this);
        this.Automated = this.Automated.bind(this);
    }

    GetPercenterSaved = (targetAmount, savedAmount) => {
        return (savedAmount / targetAmount) * 100;
    };

    componentDidMount(){
       const details = this.props.groupDetails.response;
       this.setState({
           groupDetails: details
       })
       
       let isAdmin = this.props.groupDetails.response.isAdmin;
       console.log(isAdmin);
       this.setState({
           'isAdmin': isAdmin
       })

       this.setState({'adminValidity': isAdmin});
    }


    HandleNavigation = () => {
        console.log('was fired');
        //return <Redirect to="/savings/group/group-analytics2" />
        this.props.history.push("/savings/group/group-analytics2");
    };

    Automated = () => {
        this.props.history.push('/savings/group/automate-contributions');
    };

    GetMonth = (param) => {
            switch(param){
               case '01':
                  return 'January';
               case '02':
                  return 'February';
               case '03':
                  return 'March';
               case '04':
                  return 'April';
               case '05':
                  return 'May';
               case '06':
                  return 'June';
               case '07':
                  return 'July';
               case '08':
                  return 'August';
               case '09':
                  return 'September';
               case '10':
                  return 'October';
               case '11':
                  return 'November';
               case '12':
                  return 'December';
             }
    };

    GetTargetMonth = () => {
        const dateString = this.props.groupDetails.response.targetDate.split("-");
        const day = dateString[2].split("T")[0];
        const month = this.GetMonth(dateString[1]);
        const year = dateString[0];
        return day.concat(" ", month, " ", year);
    };

    GetGroupInterest = () => {
       return this.props.groupDetails.response.groupInterest;
    };

    GetGroupSavedAmount = () => {
        return this.props.groupDetails.response.groupSavedAmount + " of ".toLowerCase();
    };

    GetGroupTargetAmount = () => {
        return this.props.groupDetails.response.targetAmount;
    };

    GetIndividualSavedAmount = () => {
        return this.props.groupDetails.response.yourSavedAmount + " of ".toLowerCase();
    };

    GetGroupStatus = () => {
        return this.props.groupDetails.response.groupStatus + " % Completed! ".toLowerCase();
    };

    GetGroupStatus2 = () => {
        return this.props.groupDetails.response.groupStatus;
    };

    GetYourInterest = () => {
        return this.props.groupDetails.response.yourInterest;
    };

    GetReferalCode = () => {
        return this.props.groupDetails.response.referralCode;
    };

    // DeleteThisGroup = (event) => {
    //     let data = {
    //         groupId: parseInt(event.target.id),
    //         deleteGroup: 'deleteGroup'
    //     };
    //     this.props.dispatch(actions.deleteGroup(this.state.user.token, data));
    // };

    GoToConfirmDelete = () => {
        history.push('/savings/delete-group-savings');
    }

    PauseThisGroup = (event) => {
        let data = {
            groupId: parseInt(event.target.id),
        };
        this.props.dispatch(actions.pauseGroup(this.state.user.token, data));
    };

    EditThisGroup = () => {
        history.push('/group-savings/edit-group');
    };

    GoToContributionPage = () => {
        console.log('uuuuuuu')
        history.push('/savings/contribute-to-group');
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
        const {endDate,endDateInvalid,adminValidity, isAdmin} = this.state;

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
                                                  <p>Target Group</p>
                                                  <p>{this.props.groupDetails.response.name}</p>
                                                  <p>{this.props.groupDetails.response.purpose}</p>
                                             </div>
                                                <SubHead 
                                                type={this.state.type}
                                                rightname="Group Summary"
                                                middlename="Members"
                                                leftName="Automate Contributions"
                                                memberClicked={this.HandleNavigation}
                                                automatedwasclicked={this.Automated}
                                                left="left"
                                                />
                                           
                                             <div className='statContainer'>
                                                <ProgressBar 
                                                    discTopSpan="Group Progress"
                                                    discTopRight={this.GetGroupStatus()}
                                                    percentage={this.GetGroupStatus2()}
                                                    discBottom={this.GetGroupSavedAmount()}
                                                    discSpan={this.GetGroupTargetAmount()}
                                                    discBottomSib="Amount Saved"
                                                    discBottomRight={this.GetGroupInterest()}
                                                    discBottomSibRight="Group Interest"
                                                    />

                                                <ProgressBar 
                                                    discTopSpan="Your Progress"
                                                    discTopRight=""
                                                    percentage="0"
                                                    discBottom={this.GetIndividualSavedAmount()}
                                                    discSpan={this.GetGroupTargetAmount()}
                                                    discBottomSib="Amount Saved"
                                                    discBottomRight={this.GetYourInterest()}
                                                    discBottomSibRight="Group Interest"
                                                    />
                                            
                                                <MoreDetails 
                                                   lefthead={this.GetTargetMonth()}
                                                   leftBottom="Target Date"
                                                   rightContent={this.GetReferalCode()}
                                                   rightContentBottom="Group Code"
                                                />
                                                    <Buttons
                                                        buttonType={this.state.buttonType}
                                                        buttonName="contribute"
                                                        buttonClicked={this.GoToContributionPage} />
                                                {isAdmin ? 
                                                           <NavButtons 
                                                                navType={this.state.navType}
                                                                leftName='Edit'
                                                                middleName='Pause'
                                                                rightName='Delete'
                                                                edit={this.props.groupDetails.response.id}
                                                                pause={this.props.groupDetails.response.id}
                                                                delete={this.props.groupDetails.response.id}
                                                                DeleteGroup={this.GoToConfirmDelete}
                                                                PauseGroup={this.PauseThisGroup}
                                                                EditGroup={this.EditThisGroup}
                                                                /> : ""}

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

function mapStateToProps(state) {
   return {
       groupDetails: state.groupDetails.data,
       groupSavingsEsusu: state.getGroupSavingsEsusu.data,
       groups: state.customerGroup.data
   }
}

export default connect(mapStateToProps)(GroupAnalytics);









