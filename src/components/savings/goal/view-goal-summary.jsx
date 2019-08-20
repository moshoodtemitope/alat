import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Link, Route, Redirect} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import SubHead from '../../savings/group/sub-head';
import ProgressBar from '../../savings/group/progress-bar';
import moment from 'moment'
import { NavButtons } from '../../savings/group/component';
import MoreDetails from '../../savings/group/details';
import * as actions from "../../../redux/actions/savings/goal/get-customer-transaction-history.actions";

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
            goal:JSON.parse(localStorage.getItem('goal')) || [],



        };



    }
    toCurrency =(currency) =>{
        if (currency) {
            currency = typeof currency !== 'string' ? currency.toString() : currency;
            let numberValueArray = currency.split('.');
            let numberValue = this.removeComma(numberValueArray[0]);
            currency = numberValueArray.length > 1 ? numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
                + '.' + numberValueArray[1] : numberValue.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        return currency;
    };
    removeComma(currencyValue) {
        return currencyValue.replace(/,/g, '');
    }
    PauseCustomerGoal= () => {
        let data = {
            goalName:this.state.goal.goalName,
            targetDate:this.state.goal.targetDate,
            startDate:this.state.goal.startDate,
            targetAmount:parseFloat(this.state.goal.targetAmount),
            goalTypeId:parseInt(this.state.goal.goalTypeId),
            debitAmount:parseFloat(this.state.goal.debitAmount),
            frequencyId:parseInt(this.state.goal.frequencyId),
            debitAccount:this.state.goal.debitAmount
        };
        this.props.dispatch(actions.PauseCustomerGoal(this.state.user.token, data));
    };
    DeleteCustomerGoal = () => {
        return this.props.history.push('/savings/delete-goal')
    };
    UnpauseCustomerGoal = () => {
        let data = {
            goalId: parseInt(event.target.id),
        };
        this.props.dispatch(actions.unpauseCustomerGoal(this.state.user.token,data));
    };
    EditCustomerGoal = () => {
        return this.props.history.push("/savings/edit-goal", this.state.goal)

    };


    componentDidMount(){
        const details = this.props.location.state.name;
        this.setState({
            customerGoalTransHistory: details,

        },()=>{  localStorage.setItem('goal', JSON.stringify(details))
        });

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
        console.log(details);

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
                                                <li><a  href="#" className="active">Goals</a></li>
                                            </NavLink>
                                            <NavLink to="/savings/goal/group-savings-selection">
                                                <li><a href="#" >Group Savings</a></li>
                                            </NavLink>
                                            <li><a href="#">Investments</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {this.props.alert && this.props.alert.message &&
                            <div style={{width: "100%", marginRight:"120px",marginLeft:"120px"}} className={`info-label ${this.props.alert.type}`}>{this.props.alert.message}</div>
                            }
                            {details.goalTypeName === "Stash" ? (
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="max-600">
                                                <div className="al-card no-pad">

                                                    <div className='firstSubHead'>
                                                        <p>{details.goalTypeName}</p>
                                                        <p>{details.goalName}</p>
                                                    </div>
                                                    <SubHead
                                                        type={this.state.type}
                                                        middlename="Stash Summary"
                                                        memberClicked={this.HandleNavigation}
                                                        automatedwasclicked={this.Automated}
                                                    />

                                                    <div className='statContainer'>
                                                        <ProgressBar
                                                            discTopSpan="Goal Progress"
                                                            discTopRight={details.percentageCompleted + "%" + " Completed"}
                                                            percentage={details.percentageCompleted}
                                                            discBottom={"₦" + details.amountSaved}
                                                            discSpan={"of" + "₦" + details.targetAmount}
                                                            discBottomSib="Amount Saved"
                                                        />
                                                        <MoreDetails
                                                            lefthead={"₦" + details.interestAccrued}
                                                            leftBottom="Interest Accrued"
                                                            middleTop={"₦" + details.interestEarned}
                                                            middleBottom="Interest Earned"
                                                            rightContent={moment(details.nextstandingDate).format("L")}
                                                            rightContentBottom="Next Payment"/>
                                                        <div className="btn-position">
                                                            <NavLink to="/savings/withdraw-from-goal_step1">
                                                                <span href="#"
                                                                      className="btn-withdraw-goal btn-sm border-btn">Cash Out</span>
                                                            </NavLink>

                                                            <Link to={{
                                                                pathname: "/savings/top-up-goal-step1",
                                                                state: {
                                                                    name: details,

                                                                }
                                                            }}>
                                                                <span href="#"
                                                                      className="btn-top-up-goal btn-sm border-btn">Top Up Stash</span>
                                                            </Link>

                                                        </div>


                                                        <NavButtons
                                                            navType={this.state.navType}
                                                            leftName='edit'
                                                            middleName='pause'
                                                            rightName='delete'
                                                            edit={details.id}
                                                            delete={details.id}
                                                            unpause={details.id}
                                                            DeleteGroup={this.DeleteCustomerGoal}
                                                            PauseGroup={this.PauseCustomerGoal}
                                                            EditGroup={this.EditCustomerGoal}

                                                        />
                                                    </div>


                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>                            ): (
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
                                                        discTopRight={details.percentageCompleted +"%"+" Completed"}
                                                        percentage={details.percentageCompleted}
                                                        discBottom={"₦"+details.amountSaved}
                                                        discSpan={"of"+"₦"+details.targetAmount}
                                                        discBottomSib="Amount Saved"
                                                    />
                                                    <MoreDetails
                                                        lefthead={"₦"+details.interestAccrued}
                                                        leftBottom="Interest Accrued"
                                                        middleTop={"₦"+ details.interestEarned}
                                                        middleBottom="Interest Earned"
                                                         rightContent={moment(details.nextstandingDate).format("L")}
                                                         rightContentBottom="Next Payment"/>
                                                    <div className="btn-position">
                                                        <NavLink to="/savings/withdraw-from-goal_step1">
                                                         <span href="#" className="btn-withdraw-goal btn-sm border-btn">Withdraw</span>
                                                        </NavLink>

                                                         <Link to={{
                                                             pathname:"/savings/top-up-goal-step1",
                                                             state:{
                                                                 name:details,

                                                             }
                                                         }}>
                                                         <span href="#"  className="btn-top-up-goal btn-sm border-btn">Top Up Goal</span>
                                                        </Link>

                                                     </div>


                                                    <NavButtons
                                                       navType={this.state.navType}
                                                        leftName='edit'
                                                        middleName='pause'
                                                        rightName='delete'
                                                       edit={details.id}
                                                       delete={details.id}
                                                       unpause={details.id}
                                                       DeleteGroup={this.DeleteCustomerGoal}
                                                       PauseGroup={this.PauseCustomerGoal}
                                                       EditGroup={this.EditCustomerGoal}

                                                    />
                                                </div>


                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                                )}

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
        alert:state.alert

    }
}

export default connect(mapStateToProps)(ViewGroupSummary);










