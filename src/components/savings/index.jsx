import  React, {Component, Fragment}from "react";
import InnerContainer from '../../shared/templates/inner-container';
import { Route, NavLink } from "react-router-dom";
import ChooseGoalPlan from './goal/goal-plan';
import FixedGoal from './fixed-goal_step1'
import FixedGoalComplete from './fixed-goal-step2';
import FixedGoalSummary from './fixed-goal-summary';
import FlexGoal from './flex-goal-step1';
import FlexGoalSummary from './flex-goal-summary';
import CreateStashGoal from './create-stash_step1';
import CreateStashGoalStep2 from './create-stash-step2'
import GroupSavingsSelection from './group/group-saving-selection';
import CreateATargetGoal from './group/create-a-target-goal';
import GroupCreated from './group/group-created';
import GroupAnalytics from './group/group-analytics';
import GroupAnalytics2 from './group/group-analytics2';
import GroupAnalytics3 from './group/group-analytics3';
import AutomateGroupSavings from './group/automated-group-savings';
import SuccessMessage from './group/success-message';
import RotatingGroup from './group/rotating-savings-group';
import RotatingGroupCreated from './group/rotating-group-created';
import GroupAnalyticsMini from './group/group-analytics-mini';
import JoinAGroup from './group/join-a-group';
import JoinedGroupSuccessfully from './group/joined-group-successfully';
import  CreateStashSuccessMessage from './goal/create-stash-success';
import GroupAnalyticsMini2 from './group/group-analytics-mini2';
import ParentDashBoard from './group/parent-dashboard';
import ViewGoalSummary from './goal/view-goal-summary';
import WithDrawFromGoal from './goal/withdraw-from-goal';
import WithDrawFromGoalSummary from './goal/withdraw-from-goal-summary'
import TopUpGoal from './goal/Top-up-goal';
import TopUpGoalSummary from './goal/Top-up-goal-summary';
import TopUpGoalSuccess from './goal/top-up-goal-success';
import FixedGoalSuccess from './goal/Fixed-goal-success';
import MemberSlots from './group/members-slot';
import EditGroupSavings from './group/edit-group-savings';
import EditRotatingGroup from './group/edit-rotating-savings-group';
import DeleteGoal from './goal/delete-goal';
import EditGoal from './goal/Edit-Goal';
import FlexGoalStep2 from './flex-goal-step2';
import StashCashout from './goal/cash-out-goal';
import FlexSuccessMessage from './goal/flex-goal-success';
import JoinGroupSummary from './group/join-group-summary';
import JoinGroupSuccessMessage from './group/joined-group-successfully';
import CashoutStashGoal from './goal/cash-out-stash-goal_summary';
import deleteGoalSucess from "./goal/delete-goal-success"
import RotatingSavingsEditedSuccessfully from './group/success-message-edit-esusu';
import RotatingSavingsEditedSuccessfullyDeleted from './group/success-message-rotating-delete';
import RotatingDelete from './group/confirm-rotating-delete';
import GroupDelete from './group/confirm-group-savings-delete';
import SavingsGroupDeleted from './group/success-deleted-group-savings';
import ContributeToGroup from './group/contribute-to-group';





class SavingsContainer extends Component {


    constructor(props){
        super(props);
    }
    componentDidMount(){

    };
    render() {
        // console.log(this.props);
        return (
            <Fragment>
                <InnerContainer>

                    <div className="dashboard-wrapper">
                        <div className="container">
                        {this.props.children}
                            <Route exact path={'/savings/choose-goal'}  component={ChooseGoalPlan}/>
                            <Route  path={'/savings/choose-goal-plan'}  component={ChooseGoalPlan}/>
                            <Route path={'/savings/fixed-goal'}  component={FixedGoal}/>
                            <Route path={'/savings/fixed-goal-complete'} component={FixedGoalComplete}/>
                            <Route path={'/savings/fixed-goal-summary'}  component={FixedGoalSummary}/>
                            <Route path={'/savings/flex-goal'}  component={FlexGoal}/>
                            <Route path={'/savings/flex-goal-summary'}  component={FlexGoalSummary}/>
                            <Route path={'/savings/create-stash_step1'} component={CreateStashGoal}/>
                            <Route path={'/savings/create-stash_step2'}  component={CreateStashGoalStep2}/>
                            <Route path={'/savings/goal/group-savings-selection'} component={GroupSavingsSelection} />
                            <Route path={'/savings/group/save-towards-a-target'}  component={CreateATargetGoal} />
                            <Route path={'/savings/group/group-created' } component={GroupCreated} />
                            <Route path={'/savings/group/group-analytics'} component={GroupAnalytics} />
                            <Route path={'/savings/group/group-analytics2'}  component={GroupAnalytics2} />
                            <Route path={"/savings/group/automate-contributions"}  component={GroupAnalytics3} />
                            <Route path="/savings/group/automate-group-savings" component={AutomateGroupSavings} /> 
                            <Route path="/savings/group/success-message" component={SuccessMessage} />
                            <Route path="/savings/group/create-rotating"  component={RotatingGroup} />
                            <Route path="/savings/rotating-group" component={RotatingGroupCreated} />
                            <Route path='/savings/group-analytics-mini'  component={GroupAnalyticsMini} />
                            <Route path='/savings/group-mini2'  component={GroupAnalyticsMini2} />
                            <Route path='/savings/group/join-a-group'  component={JoinAGroup} />
                            <Route path="/savings/group/joingroup-success-message"  component={JoinedGroupSuccessfully} />
                            <Route path="/savings/goal/create-stash-success-message"  component={CreateStashSuccessMessage} />
                            <Route path='/savings/fixed-goal-success' component={FixedGoalSuccess} />
                            <Route path='/savings/activityDashBoard'  component={ParentDashBoard} />
                            <Route path='/savings/view-goal-summary'  component={ViewGoalSummary} />
                            <Route path='/savings/withdraw-from-goal_step1'  component={WithDrawFromGoal} />
                            <Route path='/savings/withdraw-from-goal_summary'  component={WithDrawFromGoalSummary} />
                            <Route path='/savings/top-up-goal-step1'  component={TopUpGoal} />
                            <Route path='/savings/top-up-goal-summary'  component={TopUpGoalSummary} />
                            <Route path='/savings/top-up-goal-success' component={TopUpGoalSuccess} />
                            <Route path='/group-savings/edit-members-slots'  component={MemberSlots} />
                            <Route path='/group-savings/edit-group'  component={EditGroupSavings} />
                            <Route path='/group-savings/edit-rotating'  component={EditRotatingGroup} />
                            <Route path='/savings/delete-goal'  component={DeleteGoal} />
                            <Route path='/savings/edit-goal'  component={EditGoal} />
                            <Route path='/savings/flex-goal-step2'  component={FlexGoalStep2} />
                            <Route path='/savings/stash-cashout' component={StashCashout} />
                            <Route path='/savings/flex-success-message' component={FlexSuccessMessage} />
                            <Route path="/savings/join-group-summary"  component={JoinGroupSummary} />
                            <Route path="/savings/joined-group-successfully"  component={JoinGroupSuccessMessage} />
                            <Route path="/savings/cashout-goal-summary"  component={CashoutStashGoal} />
                            <Route path="/savings/delete-goal-success"  component={deleteGoalSucess} />
                            <Route path="/savings/rotating-edited-successfully"  component={RotatingSavingsEditedSuccessfully} />
                            <Route path="/savings/rotating-deleted-successfully" component={RotatingSavingsEditedSuccessfullyDeleted} />
                            <Route path="/savings/rotating-confirm-delete" component={RotatingDelete} />
                            <Route path="/savings/delete-group-savings" component={GroupDelete} />
                            <Route path="/savings/delete-group-savings-mod" component={SavingsGroupDeleted} />
                            <Route path="/savings/contribute-to-group" component={ContributeToGroup} />

                            
                        </div>
                    </div>
                    </InnerContainer>
                </Fragment>
        );
    }
}

export default SavingsContainer;