import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '../container';
import {NavLink, Route} from "react-router-dom";
import {Switch} from "react-router";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import SelectDebitableAccounts from '../../../shared/components/selectDebitableAccounts';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import * as actions from '../../../redux/actions/savings/group-savings/rotating-group-saving-action';

class RotatingGroupCreated extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            user: JSON.parse(localStorage.getItem("user"))
        }
    }

    componentDidMount = () => {
       const data = {
           groupId: this.props.createdGroupSavings.response.id
       }
       console.log(data);
       //return;
       this.props.dispatch(actions.rotatingGroupDetails(this.state.user.token, data))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        return null;
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
                                        <NavLink to='/savings/goal/group-savings-selection'>
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
                                       <h4 className="m-b-10 center-text hd-underline">Group Created</h4>

                                            <form onSubmit={this.handleSubmit}>
                                                <div className="form-group instruction">
                                                    <h6>Use the code below to invite your friends to join the group.</h6>
                                                </div>
                                                <div className="forCode">
                                                        <div className="left">
                                                            <h2>{this.props.createdGroupSavings.response.referralCode}</h2>
                                                        </div>
                                                        <div className="right">
                                                            <i></i>
                                                        </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6 butLeft">
                                                        <button>Share Code</button>
                                                    </div>
                                                    <div className="form-group col-md-6 butRight">
                                                        <NavLink to='/savings/group-analytics-mini'>
                                                              <button>Proceed To Group</button>
                                                        </NavLink>
                                                    </div>
                                                </div>
                                            </form>
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
       createdGroupSavings: state.createRotatingGroupSavings.data
   }
}

export default connect(mapStateToProps)(RotatingGroupCreated);
