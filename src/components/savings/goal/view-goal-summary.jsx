import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import SubHead from '../../savings/group/sub-head';
import ProgressBar from '../../savings/group/progress-bar';
import Buttons from '../../savings/group/button';
import moment from 'moment'
import { NavButtons } from '../../savings/group/component';
import MoreDetails from '../../savings/group/details';

class ViewGroupSummary extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: JSON.parse(localStorage.getItem("user")),
            type: 3,
            userType: 'members',
            navType: 3,
            buttonType: "smallButton",
            discTopSpan: 'something',
            customerGoalTransHistory: null,


        };



    }


    componentDidMount(){
        const details = this.props.location.state.name;
        this.setState({
            customerGoalTransHistory: details
        });
        console.log(details)

    }



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




    render() {

        const details = this.props.location.state.name;

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
                                                <li><a className="active">Goals</a></li>
                                            </NavLink>
                                            <NavLink to="/savings/goal/group-savings-selection">
                                                <li><a >Group Savings</a></li>
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
                                                    <p>{details.goalTypeName}</p>
                                                    <p>{details.goalName}</p>
                                                </div>
                                                <SubHead
                                                    type={this.state.type}
                                                    middlename="Goal Summary"
                                                    memberClicked={this.HandleNavigation}
                                                    automatedwasclicked={this.Automated}
                                                />

                                                <div className='statContainer'>
                                                    <ProgressBar
                                                        discTopSpan="Goal Progress"
                                                        discTopRight={details.status +"%"+" Completed"}
                                                        percentage={details.status}
                                                        discBottom={"₦"+details.amountSaved}
                                                        discSpan={"of"+"₦"+details.targetAmount}
                                                        discBottomSib="Amount Saved"
                                                    />
                                                    <MoreDetails
                                                        lefthead={"₦"+details.interestAccrued}
                                                        leftBottom="Interest Accrued"
                                                        // middleContent={"₦"+ details.interestEarned}
                                                        // middleContentButtom="Interest Earned"
                                                         rightContent={moment(details.nextstandingDate).format("L")}
                                                         rightContentBottom="Next Payment"/>
                                                    <div className="btn-position">
                                                        <a href="#" className="btn-withdraw-goal btn-sm border-btn">Withdraw</a>
                                                        <a href="#"  className="btn-top-up-goal btn-sm border-btn">Top Up Goal</a>
                                                     </div>



                                                    <NavButtons
                                                       navType={this.state.navType}
                                                        leftName='edit'
                                                        middleName='pause'
                                                        rightName='delete'
                                                    />
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


function mapStateToProps(state) {
    return {
        customerGoalTransHistory:state.customerGoalTransHistory,
    }
}

export default connect(mapStateToProps)(ViewGroupSummary);










