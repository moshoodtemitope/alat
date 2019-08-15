import * as React from "react";
import {Fragment} from "react";
import InnerContainer from '../../../shared/templates/inner-container';
import SavingsContainer from '../container';
import successLogo from '../../../assets/img/success.svg';
import {NavLink, Route, Redirect} from "react-router-dom";
import Members from '../../savings/group/list-item';
import { connect } from "react-redux";

class CreateStashSuccessMessage extends React.Component {
    constructor(props){
        super(props);
        this.state={
            targetAmount:"",
        
        }
    }



    render() {
        const details =this.props.location.state;
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
                                            <li><a className="active">Goals</a></li>
                                        </NavLink>
                                        <NavLink to="/savings/goal/group-savings-selection">
                                            <li><a>Group Savings</a></li>
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
                                                    <center>
                                                    <img className="successIcon"    alt="" src={successLogo}/>
                                                    </center>
                                                    <label id="sucMessage">Stash creation was successful</label>
                                                </div>
                                                <div className="form-row">
                                                <Members 
                                                   userType="admin"
                                                   name="Stash"
                                                   position="Status: Completed"
                                                    amount={this.props.create_stash_goal.response.data.targetAmount}
                                                   intent="Amount Saved"
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
const mapStateToProps = state => ({
    create_stash_goal:state.create_stash_goal,
    create_stash_goal_step1:state.create_stash_step1
});
export default connect(mapStateToProps)(CreateStashSuccessMessage);
