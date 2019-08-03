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
import * as actions from '../../../redux/actions/savings/group-savings/group-savings-actions';

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
            groupDetails: null
        }

        this.HandleNavigation = this.HandleNavigation.bind(this);
        this.Automated = this.Automated.bind(this);
    }

    GetPercenterSaved = (targetAmount, savedAmount) => {
        return (savedAmount / targetAmount) * 100;
    }

    componentDidMount(){
       this.setState({
           groupDetails: this.props.groupDetails
       })
       setTimeout(function(){
           if(this.state.groupDetails == null){
              this.GetGroupData();
           }
       }, 60000);
       console.log("group details was outputted!")
       console.log(this.state.groupDetails);
    }

    GetGroupData = () => {
        this.props.dispatch(action.GetCustomerGroups(this.state.user));
    }


    HandleNavigation = () => {
        console.log('was fired');
        //return <Redirect to="/savings/group/group-analytics2" />
        this.props.history.push("/savings/group/group-analytics2");
    }

    Automated = () => {
        this.props.history.push('/savings/group/automate-contributions');
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
                                            <li><a href="accounts.html">Goals</a></li>
                                            <li><a className="active">Group Savings</a></li>
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
                                                />
                                           
                                             <div className='statContainer'>
                                                <ProgressBar 
                                                    discTopSpan="Group Progress"
                                                    discTopRight="40% completion"
                                                    percentage="40"
                                                    discBottom="N20,0000 of "
                                                    discSpan="N2,000,000"
                                                    discBottomSib="Amount Saved"
                                                    discBottomRight="N2000"
                                                    discBottomSibRight="Group Interest"
                                                    />

                                                <ProgressBar 
                                                    discTopSpan="Your Progress"
                                                    discTopRight=""
                                                    percentage="40"
                                                    discBottom="N20,0000 of "
                                                    discSpan="N2,000,000"
                                                    discBottomSib="Amount Saved"
                                                    discBottomRight="N2000"
                                                    discBottomSibRight="Group Interest"
                                                    />
                                            
                                                <MoreDetails 
                                                   lefthead="19th September 2020"
                                                   leftBottom="Target Date"
                                                   rightContent="GRAFACETA"
                                                   rightContentBottom="Group Code"
                                                />
                                                {/* <NavLink to="/savings/group/group-analytics2"> */}
                                                    <Buttons
                                                        buttonType={this.state.buttonType}
                                                        buttonName="contribute"
                                                        
                                                        />
                                                {/* </NavLink> */}

                                                <NavButtons 
                                                    navType={this.state.navType}
                                                    leftName='edit'
                                                    middleName='pause'
                                                    rightName='delete'/>
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

// const mapStateToProps = (state) => {
//    return {
//        groupDetails: this.state.groupCustomerSavings
//    }
// }
// export default connect(mapStateToProps)(GroupAnalytics);

export default GroupAnalytics
// /savings/group/group-analytics2
// /savings/group/automate-contributions









