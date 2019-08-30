import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from './../container';
import {NavLink, Route, Redirect} from "react-router-dom";
import {Switch} from "react-router";
import Members from './list-item';
import { connect } from "react-redux";

class SuccessMessage extends React.Component {
    constructor(props){
        super(props);
        this.state={
        }
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

                                            <form>
                                                <div className="form-group">
                                                    <label id="sucMessage">Scheduling was successfull</label>
                                                </div>
                                                <div className="form-row">
                                                <Members 
                                                   userType="admin"
                                                   name="Group Savings"
                                                   position="Status: running"
                                                   amount={this.props.setAmountToWithDraw}
                                                   intent={this.props.setFrequency}
                                                   id="autoSummary"/>
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
        setAmountToWithDraw: state.setAmountToWithDraw.data,
        setFrequency: state.setFrequency.data
    }
}
export default connect(mapStateToProps)(SuccessMessage);
